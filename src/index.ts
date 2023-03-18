const requestURLFetch = 'https://intership-liga.ru';

// Interfaces
interface Post {
  name?: string;
  info?: string;
  isImportant?: boolean;
}

// Classes
class BasicAgent {
  constructor(private _requestURLFetch: string) {}

  protected reqestFetch = async <T>(url: string, config?: RequestInit): Promise<T> => {
    const res = await fetch(`${this._requestURLFetch}${url}`, config);
    if (res.status >= 400) {
      throw new Error(`${res.status}`);
    } else {
      const data = (await res.json()) as T;
      return data;
    }
  };
}

class RequestAgent extends BasicAgent {
  constructor() {
    super(requestURLFetch);
  }

  // Метод GET запросa
  getPosts = async (): Promise<Post[] | never> => {
    try {
      const getData = await this.reqestFetch<Post[]>(`/tasks`);
      return getData;
    } catch (error) {
      throw new Error();
    }
  };

  // Метод POST запросa
  postPosts = async (data: Post): Promise<Post[] | never> => {
    try {
      const postData = await this.reqestFetch<Post[]>(`/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return postData;
    } catch (error) {
      throw new Error();
    }
  };

  // Метод GET ID запросa
  getPostsID = async (id: number): Promise<Post[] | never> => {
    try {
      const getDataID = await this.reqestFetch<Post[]>(`/tasks/${id}`);
      return getDataID;
    } catch (error) {
      throw new Error(error);
    }
  };

  // Метод DELETE ID запроса
  deletePostID = async (id: number): Promise<Post[] | never> => {
    try {
      const deleteDataID = await this.reqestFetch<Post[]>(`/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return deleteDataID;
    } catch (error) {
      throw new Error();
    }
  };

  // Метод PATCH ID запроса
  patchPosts = async (data: Post, id: number): Promise<Post[] | never> => {
    try {
      const patchData = await this.reqestFetch<Post[]>(`/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return patchData;
    } catch (error) {
      throw new Error();
    }
  };
}

const dataTest = {
  name: 'NIkkkkkaaaaaaaaaaaaa',
  info: 'ИХИХИХИХИХХИХИХИХИХИХИ',
  isImportant: false,
};

const reqDelete = new RequestAgent(); // Тест DELETE
reqDelete
  .deletePostID(1886)
  .then(() => console.log(`Запись успешно удалена!`))
  .catch(() => console.error(`Что-то пошло не так. Запись не удалена.`));

const reqPost = new RequestAgent(); // Тест POST
reqPost
  .postPosts(dataTest)
  .then((data) => console.log(`Запись успешно добавлена!`, data))
  .catch(() => console.error(`Что-то пошло не так. Запись не добавлена.`));

const reqGet = new RequestAgent(); // Тест GET
reqGet
  .getPosts()
  .then((data) => console.log(`Записи успешно получены!`, data))
  .catch(() => console.error('Что-то пошло не так. Записи не получены'));

const reqGetID = new RequestAgent(); // Тест GET ID
reqGetID
  .getPostsID(1164)
  .then((data) => console.log(`Запись успешно получена!`, data))
  .catch(() => console.error('Что-то пошло не так. Записи не получены'));

const reqPatch = new RequestAgent(); // Тест PATCH
reqPatch
  .patchPosts(dataTest, 1886)
  .then((data) => console.log(`Запись успешно изменена!`, data))
  .catch(() => console.error('Что-то пошло не так. Запись не изменена'));
