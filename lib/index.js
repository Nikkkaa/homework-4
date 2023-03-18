"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const requestURLFetch = 'https://intership-liga.ru';
class BasicAgent {
    constructor(_requestURLFetch) {
        this._requestURLFetch = _requestURLFetch;
        this.reqestFetch = (url, config) => __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this._requestURLFetch}${url}`, config);
            if (res.status >= 400) {
                throw new Error(`${res.status}`);
            }
            else {
                const data = (yield res.json());
                return data;
            }
        });
    }
}
class RequestAgent extends BasicAgent {
    constructor() {
        super(requestURLFetch);
        this.getPosts = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const getData = yield this.reqestFetch(`/tasks`);
                return getData;
            }
            catch (error) {
                throw new Error();
            }
        });
        this.postPosts = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const postData = yield this.reqestFetch(`/tasks`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                return postData;
            }
            catch (error) {
                throw new Error();
            }
        });
        this.getPostsID = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getDataID = yield this.reqestFetch(`/tasks/${id}`);
                return getDataID;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.deletePostID = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteDataID = yield this.reqestFetch(`/tasks/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                return deleteDataID;
            }
            catch (error) {
                throw new Error();
            }
        });
        this.patchPosts = (data, id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const patchData = yield this.reqestFetch(`/tasks/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                return patchData;
            }
            catch (error) {
                throw new Error();
            }
        });
    }
}
const dataTest = {
    name: 'Dangeon Master322 Changed',
    info: 'ЯЛКВМО2М',
    isImportant: true,
};
const reqDelete = new RequestAgent();
const reqPost = new RequestAgent();
const reqGet = new RequestAgent();
const reqGetID = new RequestAgent();
const reqPatch = new RequestAgent();
reqPatch
    .patchPosts(dataTest, 1886)
    .then((data) => console.log(`Запись успешно изменена!`, data))
    .catch(() => console.error('Что-то пошло не так. Запись не изменена'));
//# sourceMappingURL=index.js.map