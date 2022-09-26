import { categoryType } from '@/services/category';
import { IconMinusCircle, IconPlusCircle } from '@douyinfe/semi-icons';
import { ArrayField, Button, Form, Modal, Tag, useFormApi, useFormState } from '@douyinfe/semi-ui';
import React from 'react';

export interface EditorCategoryProps {
  open: boolean;
  title?: string;
  category?: Partial<categoryType>;
  onClose: () => void;
  onSubmit?: (form) => void;
}

const EditCategoryForm: React.FC<EditorCategoryProps> = ({ category, onClose, open, title, onSubmit }) => {
  return (
    <Modal title={title} visible={open} onCancel={onClose}>
      <Form
        initValues={category}
        style={{ width: 400 }}
        labelPosition="left"
        onValueChange={(values) => console.log(values)}
      >
        {({ formState, values, formApi }) => {
          return (
            <>
              <div className="mb-4">ID : {category.id}</div>
              <div className="my-2">
                创建时间 : <Tag className="ml-2">{category.created_at}</Tag>
              </div>
              <Form.Input field="name" label="分类名称 :" style={{ width: '100%' }} placeholder="请输入分类名称" />
              <Form.Input field="slug" label="分类别名 :" style={{ width: '100%' }} placeholder="请输入分类别名" />
              <Form.TextArea
                field="description"
                label="分类描述 :"
                style={{ width: '100%' }}
                placeholder="请输入分类描述"
              />
              <ArrayField field="extends" initValue={[]}>
                {({ add, arrayFields, addWithInitValue }) => (
                  <React.Fragment>
                    <Button block onClick={add} icon={<IconPlusCircle />} theme="light">
                      添加扩展字段
                    </Button>
                    {/* <Button
                    icon={<IconPlusCircle />}
                    onClick={() => {
                      addWithInitValue({ name: '自定义贴纸', type: '2D' });
                    }}
                    style={{ marginLeft: 8 }}
                  >
                    新增带有初始值的行
                  </Button> */}
                    {arrayFields.map(({ field, key, remove }, i) => (
                      <div key={key} className="flex">
                        <Form.Input field={`${field}[key]`} label={<span>key:</span>}></Form.Input>
                        <Form.Input field={`${field}[value]`} label={<span className="ml-3">value:</span>}></Form.Input>
                        <Button
                          type="danger"
                          theme="borderless"
                          icon={<IconMinusCircle />}
                          onClick={remove}
                          style={{ margin: 12 }}
                        ></Button>
                      </div>
                    ))}
                  </React.Fragment>
                )}
              </ArrayField>
            </>
          );
        }}
      </Form>
    </Modal>
  );
};

export default EditCategoryForm;
