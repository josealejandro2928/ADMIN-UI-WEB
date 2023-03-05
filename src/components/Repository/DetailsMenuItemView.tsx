import { Text, Table, Tooltip, Flex, Button } from '@mantine/core';
import { ItemRepository } from '../../classes/repository.classes';
import { IconTrash } from '@tabler/icons-react';


const DetailsMenuItemView = ({ item, addBtn, deleteModel }: {
    item: ItemRepository | null,
    addBtn: React.ReactNode,
    deleteModel: (model: ItemRepository) => any
}) => {
    return <>
        <Text mb="xs" fz="sm">Controllers</Text>
        <Flex
            gap="sm"
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
        >
            {addBtn}
            <Button onClick={() => deleteModel(item as ItemRepository)} disabled={!item} variant="outline"
                radius="md" size="xs"
                color="red"
                leftIcon={<IconTrash size="1rem" />}>
                Remove
            </Button>
        </Flex>
        {item &&
            <>
                <Text mt="xs" mb="xs" fz="sm">Details</Text>
                <ItemDetailsView item={item} />
            </>
        }

    </>
}

const ItemDetailsView = ({ item }: {
    item: ItemRepository
}) => {
    return <Table striped highlightOnHover withBorder withColumnBorders fontSize="xs">
        <thead>
            <tr>
                <th>name</th>
                <th>{item.name}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>path</td>
                <td>
                    <Tooltip label={item.path} position="bottom" arrowPosition="center">
                        <Text truncate="start" w={250}>{item.path}</Text>
                    </Tooltip>
                </td>
            </tr>
            <tr>
                <td>items</td>
                <td>{item.items}</td>
            </tr>
        </tbody>
    </Table >
}

export default DetailsMenuItemView;