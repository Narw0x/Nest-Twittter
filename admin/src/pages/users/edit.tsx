import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const UserEdit = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Name is required" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Email is required" },
                        { type: "email", message: "Please enter a valid email" }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password Hash"
                    name="password"
                    rules={[{ required: true, message: "Password hash is required" }]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Edit>
    );
}