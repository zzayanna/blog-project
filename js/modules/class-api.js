export class API {
  constructor() {
    this.url = 'https://5f573cb632f56200168bdfe8.mockapi.io';
  }

  async methodGet (endpoint) {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      return data;
    } catch (err) {
      throw Error(err);
    }
  }

  async methodPut (endpoint, data) {
    try {
      await fetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (err) {
      throw Error(err);
    }
  }

  async methodDelete (endpoint) {
    try {
      await fetch(endpoint, {
        method: 'DELETE',
      });
    } catch (err) {
      throw Error(err);
    }
  }

  async methodPost (endpoint, data) {
    try {
      await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (err) {
      throw Error(err);
    }
  }
}