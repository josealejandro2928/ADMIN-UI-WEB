import React from 'react';
import { ScrollArea, Table, Text } from '@mantine/core';
import { ItemRepository } from '../../classes/repository.classes';
import VirtualScrollTableRowChild from '../../common/VirtualScrollTableRowChild';

const TableFiles = ({ files, icon }: { files: Array<ItemRepository>; icon: any }) => {
  const rows = files.map((file) => (
    <VirtualScrollTableRowChild height={40} key={file.path}>
      <td>
        {icon}
        <Text style={{ display: 'inline' }} fz='sm'>
          {file.name}
        </Text>
      </td>
      <td width={'40%'}>
        <Text fz='sm' truncate='start' w={300}>
          {file.path}
        </Text>
      </td>
      <td>{file.isDir ? 'Yes' : 'No'}</td>
    </VirtualScrollTableRowChild>
  ));

  return (
    <ScrollArea h={`calc(100vh - 180px)`}>
      <Table captionSide='bottom' striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Name</th>
            <th>Path</th>
            <th>Is Directory</th>
          </tr>
        </thead>

        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default TableFiles;
