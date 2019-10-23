type Formats = {
  [key: string]: {
    fn: (doy: number) => string;
  }
}

export const formats: Formats = {
  a: {
    fn: (doy: number) => {
      return "LTS: ";
    },
  },
  b: {
    fn: (doy: number) => {
      return `YYYY/MM/DD [W]W/[D]E dddd - [D]${doy}/366[R] [\n]LTS: `;
    },
  },
  c: {
    fn: (doy: number) => {
      return "YYYY/MM/DD LTS - [W]W/[D]E dddd";
    },
  },
  d: {
    fn: (doy: number) => {
      return `YYYY/MM/DD LTS - [W]W/[D]E dddd - [D]${doy}/366[R]`;
    },
  },
  e: {
    fn: (doy: number) => {
      return `YYYY[W]W: YYYY/MM/DD`;
    },
  },
  f: {
    fn: (doy: number) => {
      return `YYYY/MM/DD [W]W/[D]E dddd MMMM Do - [D]${doy}/366[R]`;
    },
  },
  g: {
    fn: (doy: number) => {
      return `YYYY/MM/DD [W]W/[D]E dddd MMMM Do - [D]${doy}/366[R] LTS:`;
    },
  },
  h: {
    fn: (doy: number) => {
      return `MMMM DD, YYYY [11:59:59 PM]`;
    },
  },
}
          
/**
 * Todo:
 * - Better naming
 * - Use decay function
 */
export class DB {
  counts: Map<string, number>;

  constructor() {
    const localStorageCounts = window.localStorage.getItem('counts');
    const counts: Map<string, number> = localStorageCounts ? new Map(JSON.parse(localStorageCounts)) : new Map();

    Object.keys(formats).forEach(key => {
      if (!counts.has(key)) {
        counts.set(key, 0);
      }
    })

    this.counts = counts;
  }

  popular() {
    return Array.from(this.counts.entries()).sort((a: [keyof Formats, number], b: [keyof Formats, number]) => b[1] - a[1]);
  }

  increment(key: string) {
    const value = this.counts.get(key);
    if (value) {
      this.counts.set(key, value + 1);
    } else {
      this.counts.set(key, 1);
    }

    const map = Array.from(this.counts.entries());
    window.localStorage.setItem('counts', JSON.stringify(map));
  }
}