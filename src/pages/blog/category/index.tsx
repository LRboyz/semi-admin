import { categoryType, getCategories } from '@/services/category';
import { IconDelete, IconEdit } from '@douyinfe/semi-icons';
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  Descriptions,
  Divider,
  List,
  Skeleton,
  Typography,
} from '@douyinfe/semi-ui';
import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import EditCategoryForm from './components/EditCategory';

const CategoryPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Partial<categoryType>>({});
  const { data: categories, loading } = useRequest(async () => await getCategories());

  const SkeletonBox = () => {
    return (
      <Skeleton
        placeholder={
          <div className="flex flex-start">
            <Skeleton.Avatar style={{ marginRight: 12 }} />
            <div>
              <Skeleton.Title style={{ width: 120, marginBottom: 12, marginTop: 12 }} />
              <Skeleton.Paragraph style={{ width: 240 }} rows={3} />
            </div>
          </div>
        }
        loading={true}
        active
      />
    );
  };

  const handleEditCategory = (row: categoryType) => {
    setCurrentCategory(row);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setCurrentCategory({});
    setOpenModal(false);
  };
  const handleDeleteCategory = () => {};

  const handleSubmit = (form) => {
    console.log(form, 'form');
  };
  if (loading && !categories) {
    return <SkeletonBox />;
  }
  return (
    <div className="min-h-150">
      <div className="flex items-center mb-5">
        <Typography.Title heading={5}>分类列表</Typography.Title>
        <div className="flex-1"></div>
        <Button onClick={() => setOpenModal(true)}>添加分类</Button>
      </div>
      <Divider />
      <div className="p-3">
        <List
          grid={{
            gutter: 12,
            xs: 0,
            sm: 0,
            md: 12,
            lg: 8,
            xl: 8,
            xxl: 6,
          }}
          dataSource={categories}
          renderItem={(item) => (
            <List.Item>
              <Card className="w-80" style={{ marginBottom: 15, borderRadius: 15 }} shadows="hover">
                <div className="flex justify-between">
                  <Typography.Title heading={6}>{item.name}</Typography.Title>
                  <Button
                    type="tertiary"
                    className="ml-3"
                    theme="borderless"
                    icon={<IconEdit />}
                    onClick={() => handleEditCategory(item)}
                  >
                    编辑分类
                  </Button>
                </div>

                <div className="flex flex-start mt-5">
                  <Avatar src={item.thumb} size="small" shape="square">
                    {item.name.charAt(0)}
                  </Avatar>
                  <div className="flex-1" />
                  <Descriptions align="center" size="small" row data={[{ key: '文章数', value: 6 }]} />
                </div>

                <div className="mt-10 flex justify-end">
                  <Button type="danger" className="ml-3" icon={<IconDelete />}>
                    删除
                  </Button>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
      {openModal && (
        <EditCategoryForm
          open={openModal}
          onClose={handleCloseModal}
          category={currentCategory}
          title={currentCategory.id ? '编辑分类' : '添加分类'}
        />
      )}
    </div>
  );
};

export default CategoryPage;
