/**
 * Generates HTML content for engine tooltip
 * Used by both SSR (Astro) and CSR (Tippy.js delegation)
 */

export interface Engine {
  id?: number;
  code: string;
  name?: string;
  info?: string | null;
  serie?: {
    value: string;
    label: string;
  };
  type?: {
    value: string;
    translated: string;
    label: string;
  };
  power?: {
    kw: number;
    ps: number;
    ps_label: string;
    label: string;
  };
  date?: {
    value: string;
    label: string;
  };
  displacement?: {
    value: number;
    label: string;
  };
  compression_ratio?: {
    value: string | null;
    label: string;
  };
  valves?: {
    value: number | null;
    label: string;
  };
  euro?: {
    value: number;
    label: string;
  };
  pivot?: any;

  // Backward compatibility - old flat structure
  kw?: number;
  ps?: number;
  cc?: number;
  c_ratio?: string | null;
}

export interface EngineTranslations {
  power?: string;
  cc?: string;
  compressionRatio?: string;
  valves?: string;
  euro?: string;
  horsepowerUnit?: string;
}

const defaultTranslations: EngineTranslations = {
  power: 'Power',
  cc: 'CC',
  compressionRatio: 'C. Ratio',
  valves: 'Valves',
  euro: 'Euro',
  horsepowerUnit: 'PS',
};

// Helper to get series value (supports both old and new API)
function getSerieValue(engine: Engine): string {
  if (engine.serie && typeof engine.serie === 'object') {
    return engine.serie.value;
  }
  // Backward compatibility - old API
  const serie = engine.serie as any;
  if (!serie) return '';
  return serie === 3 ? 'EA288' : serie === 2 ? 'EA189' : `Serie ${serie}`;
}

export function getEngineTooltipContent(engine: Engine, translations: EngineTranslations = {}): string {
  const t = { ...defaultTranslations, ...translations };

  // Header section
  let headerContent = `<strong>${engine.name || engine.code}</strong>`;
  if (engine.info) {
    headerContent += ` <span class="info">${engine.info}</span>`;
  }
  const serieValue = getSerieValue(engine);
  if (serieValue) {
    headerContent += `<div class="series-badge">${serieValue}</div>`;
  }

  const header = `<div class="tooltip-header">${headerContent}</div>`;

  // Specs rows
  const rows: string[] = [];

  // Power (supports both new and old API structure)
  const power = engine.power;
  const oldKw = engine.kw;
  const oldPs = engine.ps;

  if (power || oldKw || oldPs) {
    const powerValues: string[] = [];
    const kw = power?.kw || oldKw;
    const ps = power?.ps || oldPs;
    const psLabel = power?.ps_label || t.horsepowerUnit;
    const powerLabel = power?.label || t.power;

    if (kw) powerValues.push(`${kw} kW`);
    if (ps) powerValues.push(`${ps} ${psLabel}`);

    if (powerValues.length) {
      rows.push(
        `<div class="tooltip-row"><span class="tooltip-label">${powerLabel}:</span><span class="tooltip-value">${powerValues.join(' / ')}</span></div>`
      );
    }
  }

  // Displacement (CC)
  const displacement = engine.displacement;
  const oldCc = engine.cc;

  if (displacement || oldCc) {
    const ccValue = displacement?.value || oldCc;
    const ccLabel = displacement?.label || t.cc;

    if (ccValue) {
      rows.push(
        `<div class="tooltip-row"><span class="tooltip-label">${ccLabel}:</span><span class="tooltip-value">${ccValue} cm³</span></div>`
      );
    }
  }

  // Euro standard
  const euro = engine.euro;

  if (euro && typeof euro === 'object') {
    if (euro.value) {
      rows.push(
        `<div class="tooltip-row"><span class="tooltip-label">${euro.label}:</span><span class="tooltip-value">Euro ${euro.value}</span></div>`
      );
    }
  } else if (euro) {
    // Backward compatibility - old API
    rows.push(
      `<div class="tooltip-row"><span class="tooltip-label">${t.euro}:</span><span class="tooltip-value">Euro ${euro}</span></div>`
    );
  }

  const specsContent = rows.length ? `<div class="tooltip-specs">${rows.join('')}</div>` : '';

  return header + specsContent;
}
