import window from "global/window";

function waitForGlobal(name, timeout = 30000) {
  return new Promise<void>((resolve, reject) => {
    let waited = 0;

    function wait(interval) {
      setTimeout(() => {
        waited += interval;
        // some logic to check if script is loaded
        // usually it something global in window object
        if (window[name] !== undefined) {
          return resolve();
        }
        if (waited >= timeout * 1000) {
          return reject({ message: "Timeout" });
        }
        wait(interval * 2);
      }, interval);
    }

    wait(30);
  });
}

export default waitForGlobal;
