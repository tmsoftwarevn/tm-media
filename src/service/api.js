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

export const callAddMenu = (name, type_id) => {
  return axios.post(`/api/v1/menu/`, { name, type_id });
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
  // console.log("apiii:", file);
  return axios.post("/api/v1/deleteImg", { fileImg: file });
};

export const callUpdateMedia =(id,data)=>{
  return axios.put(`/api/v1/media/${id}`,{data})
}

export const callAddMedia =(data)=>{
  return axios.post(`/api/v1/media`,{data})
}

export const callDetailMedia = (id)=>{
  return axios.get(`/api/v1/media/${id}`)
}