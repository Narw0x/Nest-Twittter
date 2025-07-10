import { Show, EditButton, DeleteButton } from "@refinedev/antd";
import { Typography, Space } from "antd";
import { useShow } from "@refinedev/core";

const { Title, Text } = Typography;

export const ShowUser = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>ID</Title>
            <Text>{record?._id}</Text>

            <Title level={5}>Name</Title>
            <Text>{record?.name}</Text>

            <Title level={5}>Email</Title>
            <Text>{record?.email}</Text>

            <Title level={5}>Created At</Title>
            <Text>{record?.createdAt ? new Date(record.createdAt).toLocaleDateString() : ''}</Text>

            <Title level={5}>Updated At</Title>
            <Text>{record?.updatedAt ? new Date(record.updatedAt).toLocaleDateString() : ''}</Text>

            <Space style={{ marginTop: 16 }}>
                <EditButton recordItemId={record?._id} />
                <DeleteButton recordItemId={record?._id} />
            </Space>
        </Show>
    );
};