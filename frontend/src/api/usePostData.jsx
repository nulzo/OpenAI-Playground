import axios from "axios";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

export default function usePostData(data) {
  const postData = useMutation({
    mutationFn: (data) => {
      return axios
        .post("https://api.openai.com/v1/completions", data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  });
  if (postData) {
    return postData;
  }
}
