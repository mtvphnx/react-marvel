import {useHttp} from "../hooks/http.hook";

const useServer = () => {
    const {loading, request, error, clearError} = useHttp();

    const _domain = 'https://gateway.marvel.com:443/v1/public/',
        _apiKeys = 'apikey=eee95986dcd8befa6e61baeb32bd5c1c',
        _baseOffset = 210;

    const getAllElements = async (offset = _baseOffset) => {
        const result = await request(`${_domain}characters?limit=9&offset=${offset}&${_apiKeys}`);
        return result.data.results.map(_transformObject);
    }

    const getElement = async (id) => {
        const result = await request(`${_domain}characters/${id}?${_apiKeys}`);
        return _transformObject(result.data.results[0]);
    }

    const _transformObject = (obj) => {
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

    return {loading, error, getElement, getAllElements, clearError};
}

export default useServer;