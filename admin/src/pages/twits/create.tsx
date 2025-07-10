import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const TwitCreate = () => {
    const { formProps, saveButtonProps } = useForm();

    // Get users for the select dropdown
    const { selectProps: userSelectProps } = useSelect({
        resource: "users",
        optionLabel: "name",
        optionValue: "_id",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[{ required: true, message: "Content is required" }]}
                >
                    <Input.TextArea rows={4} placeholder="What's happening?" />
                </Form.Item>
                <Form.Item
                    label="User"
                    name="userId"
                    rules={[{ required: true, message: "User is required" }]}
                >
                    <Select {...userSelectProps} placeholder="Select a user" />
                </Form.Item>
            </Form>
        </Create>
    );
};