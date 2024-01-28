import axios from "../utils/axios-customized";

export const callTest = (id) => {
  return axios.post("/api/v1/test", { id });
};

// liên hệ

export const callAllLienhe = () => {
  return axios.get("/api/v1/lienhe");
};
export const callDeleteLienhe = (id) => {
  return axios.delete(`/api/v1/lienhe/${id}`);
};
// menu
export const callMenu_byid = (id) => {
  return axios.get(`/api/v1/menu/${id}`);
};
export const callDeleteMenu_byId = (id) => {
  return axios.delete(`/api/v1/menu/${id}`);
};

export const callUpdateMenu = (id, name) => {
  return axios.put(`/api/v1/menu/${id}`, { name });
};

export const callAddMenu = (data) => {
  return axios.post(`/api/v1/menu/`, data.name, data.type_id);
};

// upload ảnh
export const callUpload_Single_Img = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/uploadImg",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const callUpload_Single_Img_baiviet = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/uploadImg_baiviet",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
// xóa ảnh, not use body with delete
export const callDeleteImg = (file) => {
  return axios.post("/api/v1/deleteImg", { fileImg: file });
};

// media
export const callUpdateMedia = (id, banner_bg, video_bg, link, noidung) => {
  return axios.put(`/api/v1/media/${id}`, {
    banner_bg,
    video_bg,
    link,
    noidung,
  });
};

export const callAddMedia = (data) => {
  return axios.post(
    `/api/v1/media`,
    data.banner_bg,
    data.video_bg,
    data.link,
    data.noidung,
    data.type_id
  );
};

export const callDetailMedia = (id) => {
  return axios.get(`/api/v1/media/${id}`);
};

// video noi bat
export const callAddVideoNoibat = (data) => {
  return axios.post(`/api/v1/video-noibat`, { data });
};

export const callUpadteVideoNoibat = (id, data) => {
  return axios.put(
    `/api/v1/video-noibat/${id}`,
    data.video_bg,
    data.link,
    data.name
  );
};

export const callGetVideoNoibat = (id) => {
  return axios.get(`/api/v1/video-noibat/detail/${id}`);
};
