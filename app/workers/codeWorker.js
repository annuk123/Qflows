  self.onmessage = (e) => {
    try {
      const result = eval(e.data); // Be cautious with eval for security reasons.
      self.postMessage(result);
    } catch (err) {
      self.postMessage(`Error: ${err.message}`);
    }
  };
  
  