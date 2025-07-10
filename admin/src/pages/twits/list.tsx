import { List, useTable, EditButton, ShowButton, DeleteButton } from "@refinedev/antd";
import {Table, Space, Button} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import {useNavigation} from "@refinedev/core";

export const TwitList = () => {
    const { tableProps } = useTable();
    const { push } = useNavigation();

    const handleGoHome = () => {
        push('/');
    };

    return (
        <List
            headerButtons={
                <>
                    <Button
                        type="primary"
                        icon={<HomeOutlined />}
                        onClick={handleGoHome}
                    >
                        Go to Home
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => push('/twits/create')}
                    >
                        Create Twit
                    </Button>
                </>
            }
        >
            <Table {...tableProps} rowKey="_id">
                <Table.Column dataIndex="_id" title="ID" />
                <Table.Column dataIndex="content" title="Content"
                              render={(content) => content?.substring(0, 100) + (content?.length > 100 ? '...' : '')} />
                <Table.Column dataIndex="userId" title="User ID" />
                <Table.Column dataIndex="createdAt" title="Created At"
                              render={(value) => new Date(value).toLocaleDateString()} />
                <Table.Column dataIndex="updatedAt" title="Updated At"
                              render={(value) => new Date(value).toLocaleDateString()} />
                <Table.Column
                    title="Actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton hideText size="small" recordItemId={record._id} />
                            <ShowButton hideText size="small" recordItemId={record._id} />
                            <DeleteButton hideText size="small" recordItemId={record._id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};