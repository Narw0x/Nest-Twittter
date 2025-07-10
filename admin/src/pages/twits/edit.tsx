import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const TwitEdit = () => {
    const { formProps, saveButtonProps } = useForm();

    // Get users for the select dropdown
    const { selectProps: userSelectProps } = useSelect({
        resource: "users",
        optionLabel: "name",
        optionValue: "_id",
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[{ required: true, message: "Content is required" }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    label="User"
                    name="userId"
                    rules={[{ required: true, message: "User is required" }]}
                >
                    <Select {...userSelectProps} />
                </Form.Item>
            </Form>
        </Edit>
    );
};