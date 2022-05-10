export default class Server {
    _domain = 'https://gateway.marvel.com:443/v1/public/';
    _params = '?limit=9&offset=210&apikey=eee95986dcd8befa6e61baeb32bd5c1c';

    getResource = async (url) => {
        let result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }

        return await result.json();
    }

    getAllHeroes = async () => {
        const result = await this.getResource(`${this._domain}characters${this._params}`);
        return result.data.result.map(this._transformObject);
    }

    getHero = async (id) => {
        const result = await this.getResource(`${this._domain}characters/${id}${this._params}`);
        return this._transformObject(result.data.results[0]);
    }

    _transformObject = (obj) => {
        return {
            name: obj.name,
            description: obj.description,
            thumbnail: `${obj.thumbnail.path}.${obj.thumbnail.extension}`,
            homepage: obj.urls[0].url,
            wiki: obj.urls[1].url
        }
    }
}