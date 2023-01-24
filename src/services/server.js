export default class Server {
    _domain = 'https://gateway.marvel.com:443/v1/public/';
    _apiKeys = 'apikey=eee95986dcd8befa6e61baeb32bd5c1c';
    _baseOffset = 210;

    getResource = async (url) => {
        let result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`)
        }

        return await result.json();
    }

    getAllElements = async (offset = this._baseOffset) => {
        const result = await this.getResource(`${this._domain}characters?limit=9&offset=${offset}&${this._apiKeys}`);
        return result.data.results.map(this._transformObject);
    }

    getElement = async (id) => {
        const result = await this.getResource(`${this._domain}characters/${id}?${this._apiKeys}`);
        return this._transformObject(result.data.results[0]);
    }

    _transformObject = (obj) => {
        return {
            name: obj.name,
            id: obj.id,
            description: obj.description,
            thumbnail: `${obj.thumbnail.path}.${obj.thumbnail.extension}`,
            homepage: obj.urls[0].url,
            wiki: obj.urls[1].url,
            comics: obj.comics.items,
            fit: (/image_not_available/i.test(obj.thumbnail.path)) ? 'left' : (/4c002e0305708/i.test(obj.thumbnail.path)) ? 'right' : ''
        }
    }
}