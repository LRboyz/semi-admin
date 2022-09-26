import http from '@/utils/http';

export type categoryParams = {};

export type categoryType = {
  id: number;
  created_at: string;
  extends: object[];
  update_at: string;
  pid: number;
  slug: string;
  description: string;
  name: string;
  thumb: string;
  articles?: any;
};

// 获取分类列表
export async function getCategories(params?: categoryParams) {
  return http.get<categoryType[]>(`/category`, {
    params: { ...params },
  });
}
