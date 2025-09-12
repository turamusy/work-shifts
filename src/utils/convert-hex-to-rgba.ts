const HEX_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
const DEFAULT_COLOR = 'rgba(0,0,0,1)';

/**
 * Конвертирует HEX код в строку RGBA.
 * @param {string} hexCode - HEX код цвета (должен начинаться с #)..
 * @param {number} [opacity=1] - Значение непрозрачности (0-1 или 1-100)).
 * @returns {string} строку цвета RGB.
 */
export const convertHexToRGBA = (hexCode: string, opacity: number = 1): string => {
    if (!HEX_REGEX.test(hexCode)) {
        return DEFAULT_COLOR;
    }

    let hex = hexCode.slice(1);

    if (hex.length === 3) {
        hex = [...hex].map(char => char + char).join('');
    }

    const [r, g, b] = [0, 2, 4].map(offset => parseInt(hex.slice(offset, offset + 2), 16));

    const alpha = opacity > 1 && opacity <= 100 ? opacity / 100 : opacity;

    return `rgba(${r},${g},${b},${alpha})`;
};
