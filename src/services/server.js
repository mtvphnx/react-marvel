import axios from 'axios';

export default class Server {
    _domain = 'https://gateway.marvel.com:443/v1/public/';
    _params = '?limit=9&offset=210&apikey=eee95986dcd8befa6e61baeb32bd5c1c';

    getResource = async (link) => {
        return new Promise((resolve, reject) => {
            axios.get(link)
                .then(function (response) {
                    return resolve(response.data.data.results);
                })
                .catch(function (error) {
                    console.log(error);
                })
        })
    }

    getAllHeroes = async () => {
        const result = await this.getResource(`${this._domain}characters${this._params}`);
        return result.map(this._transformObject);
    }

    getHero = async (id) => {
        const result = await this.getResource(`${this._domain}characters/${id}${this._params}`);
        return this._transformObject(result[0]);
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