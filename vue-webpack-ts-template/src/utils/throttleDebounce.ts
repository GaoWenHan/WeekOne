type Procedure = (...args: any[]) => void;

interface DebounceOptions {
  leading?: boolean; // 是否立即执行
  trailing?: boolean; // 是否在延迟后执行
}

interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export function debounce<F extends Procedure>(
  func: F,
  wait = 300,
  options: DebounceOptions = {}
): F & { cancel: () => void } {
  let timeout: number | null = null;
  let lastArgs: any[];
  let result: any;
  let invoked = false;

  const debounced = function (this: any, ...args: any[]) {
    lastArgs = args;
    if (timeout) clearTimeout(timeout);

    if (options.leading && !invoked) {
      result = func.apply(this, args);
      invoked = true;
    }

    timeout = window.setTimeout(() => {
      if (options.trailing !== false && (!options.leading || invoked)) {
        result = func.apply(this, lastArgs);
      }
      timeout = null;
      invoked = false;
    }, wait);

    return result;
  };

  debounced.cancel = () => {
    if (timeout) clearTimeout(timeout);
    timeout = null;
    invoked = false;
  };

  return debounced as F & { cancel: () => void };
}

export function throttle<F extends Procedure>(
  func: F,
  wait = 300,
  options: ThrottleOptions = {}
): F & { cancel: () => void } {
  let timeout: number | null = null;
  let previous = 0;
  let lastArgs: any[];

  const throttled = function (this: any, ...args: any[]) {
    const now = Date.now();
    const remaining = wait - (now - previous);
    lastArgs = args;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(this, args);
    } else if (!timeout && options.trailing !== false) {
      timeout = window.setTimeout(() => {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        func.apply(this, lastArgs);
      }, remaining);
    }
  };

  throttled.cancel = () => {
    if (timeout) clearTimeout(timeout);
    timeout = null;
    previous = 0;
  };

  return throttled as F & { cancel: () => void };
}
