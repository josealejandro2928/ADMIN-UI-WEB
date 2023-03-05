import { Text, Table, Tooltip } from '@mantine/core';
import { ItemRepository } from '../../classes/repository.classes';

const DetailsMenuItemView = ({ item }: {
    item: ItemRepository | null
}) => {
    return <>
        {item && <ItemDetailsView item={item}></ItemDetailsView>}
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