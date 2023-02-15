import {useHttp} from "../hooks/http.hook";

const useServer = () => {
    const {loading, request, error, clearError} = useHttp();

    const _domain = 'https://gateway.marvel.com:443/v1/public/',
        _apiKey = 'apikey=eee95986dcd8befa6e61baeb32bd5c1c';

    const getAllCharacters = async (offset = 210) => {
        const result = await request(`${_domain}characters?limit=9&offset=${offset}&${_apiKey}`);
        return result.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const result = await request(`${_domain}characters/${id}?${_apiKey}`);
        return _transformCharacter(result.data.results[0]);
    }

    const getAllComics = async (offset = 0) => {
        const result = await request(
            `${_domain}comics?orderBy=-focDate&limit=8&offset=${offset}&${_apiKey}`
        );
        return result.data.results.map(_transformComics);
    };

    const getComic = async (id) => {
        const result = await request(`${_domain}comics/${id}?${_apiKey}`);
        return _transformComics(result.data.results[0]);
    };

    const _transformCharacter = (char) => {
        return {
            name: char.name,
            id: char.id,
            description: char.description || 'Description not found',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
            fit: (/image_not_available/i.test(char.thumbnail.path)) ? 'left' : (/4c002e0305708/i.test(char.thumbnail.path)) ? 'right' : ''
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || "Description not found",
            pageCount: comics.pageCount
                ? `Number of pages: ${comics.pageCount}`
                : "No information about the number of pages",
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            language: comics.textObjects[0]?.language || "en-us",
            price: comics.prices[0].price
                ? `Price: ${comics.prices[0].price}$`
                : "Price not found",
        };
    };

    return {loading, error, getCharacter, getAllCharacters, getAllComics, getComic, clearError};
}

export default useServer;