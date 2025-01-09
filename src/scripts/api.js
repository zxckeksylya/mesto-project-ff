const config = {
  url: "https://nomoreparties.co/v1/wff-cohort-29",
  headers: {
    authorization: "793f856e-9e4f-4684-878d-7be1703a0791",
    "Content-Type": "application/json",
  },
};

const handleFetch = async ({ method, url, body = {} }) => {
  const options = {
    method,
    headers: config.headers,
  };

  if (Object.keys(body).length) {
    options.body = JSON.stringify(body);
  }

  return await fetch(`${config.url}${url}`, options).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return new Error(`ошибка ${res.status}: ${res.statusText}`);
  });
};

const fecthService = {
  get: async ({ url }) => {
    return handleFetch({ method: "GET", url });
  },
  post: async ({ url, body }) => {
    return handleFetch({ method: "POST", url, body });
  },
  patch: async ({ url, body }) => {
    return handleFetch({ method: "PATCH", url, body });
  },
  delete: async ({ url }) => {
    return handleFetch({ method: "DELETE", url });
  },
  put: async ({ url }) => {
    return handleFetch({ method: "PUT", url });
  },
};

const cardsService = {
  getInitialCards: async () => {
    return fecthService.get({ url: "/cards" });
  },

  addNewCard: async ({ body }) => {
    return fecthService.post({ url: "/cards", body });
  },

  deleteCard: async ({ cardId }) => {
    return fecthService.delete({ url: `/cards/${cardId}` });
  },

  likeCard: async ({ cardId }) => {
    return fecthService.put({ url: `/cards/likes/${cardId}` });
  },

  unlikeCard: async ({ cardId }) => {
    return fecthService.delete({ url: `/cards/likes/${cardId}` });
  },
};

const userService = {
  getUserProfile: async () => {
    return fecthService.get({ url: "/users/me" });
  },

  updateUserAvatar: async ({ body }) => {
    console.log(body);
    return fecthService.patch({ url: "/users/me/avatar", body });
  },

  updateUserInfo: async ({ body }) => {
    console.log(body);
    return fecthService.patch({ url: "/users/me", body });
  },
};

export const api = {
  userService,
  cardsService,
};
