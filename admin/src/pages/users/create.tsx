import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const UserCreate = () => {
    const { formProps, saveButtonProps } = useForm();


    return (
        <Create saveButtonProps={saveButtonProps}>
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
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Password is required" }]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Create>
    );
};