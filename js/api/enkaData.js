
const ENKA_ZZZ_URL = 'https://zzz-proxy.lyned.workers.dev/?uid={uid}';
const DEFAULT_OK_TTL = 600_000;
const TTL_RATE_LIMITED = 120_000;
const TTL_TIMEOUT = 45_000;
const TTL_ERROR = 60_000;
const READ_TIMEOUT_MS = 20_000;

const cache = new Map();

function ttlForOutcome(kind) {
  if (kind === 'ok') return DEFAULT_OK_TTL;
  if (kind === 'rate_limited') return TTL_RATE_LIMITED;
  if (kind === 'timeout') return TTL_TIMEOUT;
  return TTL_ERROR;
}

function parseShowcase(data) {
  if (data?.PlayerInfo?.ShowcaseDetail) {
    const showcase = data.PlayerInfo.ShowcaseDetail;
    const avatarList = showcase.AvatarList ?? [];
    return avatarList.map((avatar, idx) => ({
      indice: idx + 1,
      avatar_id: avatar.Id,
      nivel: avatar.Level,
      dupes: avatar.TalentLevel ?? 0,
      weapon_id: avatar.Weapon?.Id,
      weapon_dupes: (avatar.Weapon?.BreakLevel ?? 1) - 1,
      data_completa: avatar,
    }));
  }
  return null;
}

async function fetchFromNetwork(uid) {
  const url = ENKA_ZZZ_URL.replace('{uid}', String(uid));
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), READ_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });
    const status = response.status;

    if (status === 429) {
      return { kind: 'rate_limited', message: 'Demasiadas peticiones a Enka. Espera unos minutos.' };
    }
    if (status >= 400) {
      return { kind: 'http_error', message: `Enka respondió HTTP ${status}`, http_status: status };
    }

    let data;
    try {
      data = await response.json();
    } catch {
      return { kind: 'invalid_json', message: 'Respuesta inválida de Enka.' };
    }

    const nickname = data?.PlayerInfo?.SocialDetail?.ProfileDetail?.Nickname ?? 'Viajero';
    const personajes = parseShowcase(data);
    if (!personajes) {
      return { kind: 'no_showcase', message: 'No se encontró escaparate para este UID.' };
    }
    return { kind: 'ok', personajes, nickname };
  } catch (err) {
    if (err.name === 'AbortError') {
      return { kind: 'timeout', message: 'Enka no respondió a tiempo.' };
    }
    return { kind: 'network', message: `Error de red: ${err.message}` };
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchShowcaseFromEnka(uid) {
  const key = String(uid);
  const now = Date.now();
  const cached = cache.get(key);
  if (cached && now < cached.expires) return cached.outcome;

  const outcome = await fetchFromNetwork(uid);
  cache.set(key, { expires: now + ttlForOutcome(outcome.kind), outcome });
  return outcome;
}
