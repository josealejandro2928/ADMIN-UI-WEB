import React, { memo } from 'react';
import { ScrollArea, Table, Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import VirtualScrollTableRowChild from './VirtualScrollTableRowChild';

const SmartTable = ({
  files,
  style = {},
  columns,
  className,
}: {
  files: Array<any>;
  columns?: any[] | null;
  className?: any;
  style?: React.StyleHTMLAttributes<any>;
}) => {
  const [data, setData] = useState<Array<any>>([]);
  const [usedColumns, setUsedColumns] = useState<Array<string>>([]);

  useEffect(() => {
    generateColumns();
    populateData();
  }, [files, columns]);

  function generateColumns() {
    if (columns?.length) {
      setUsedColumns(columns);
      return;
    }
    if (files.length == 0) return;
    let firsEl = files[0];
    setUsedColumns(Object.keys(firsEl));
  }

  function populateData() {
    setData(files);
  }

  function renderCell(el: any) {
    if ((typeof el == 'string' || typeof el == 'number') && !isNaN(parseInt(el as string))) {
      return (+el).toFixed(2);
    }
    return el?.toString();
  }

  const rows = data.map((file, i) => (
    <VirtualScrollTableRowChild height={40} key={i}>
      {usedColumns.map((el, j) => (
        <td key={`${i},${j}`}>
          <span>{renderCell(file[el])}</span>
        </td>
      ))}
    </VirtualScrollTableRowChild>
  ));

  return (
    <ScrollArea h={`calc(100vh - 212px)`}>
      <Table
        captionSide='bottom'
        className={className}
        {...style}
        striped
        highlightOnHover
        withBorder
        withColumnBorders
      >
        <thead>
          <tr>
            {usedColumns.map((el) => (
              <th key={el}>{el}</th>
            ))}
          </tr>
        </thead>

        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

const SmartTableMemo = memo(SmartTable);

export default SmartTableMemo;
