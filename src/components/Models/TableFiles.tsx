import React from "react";
import { Table, Text } from "@mantine/core";
import { ItemRepository } from '../../classes/repository.classes';

const TableFiles = ({ files, icon }: { files: Array<ItemRepository>, icon: any }) => {
    return (
        <Table captionSide="bottom"
            striped highlightOnHover withBorder withColumnBorders>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Path</th>
                    <th>Is Directory</th>
                </tr>
            </thead>
            <tbody>
                {files.map((file) => (
                    <tr key={file.path}>
                        <td>
                            {icon}
                            <Text style={{display:"inline"}} fz="xs">{file.name}</Text>
                        </td>
                        <td width={"30%"}>
                            <Text fz="xs" truncate="end" w={300}>{file.path}</Text>
                        </td>
                        <td>{file.isDir ? "Yes" : "No"}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TableFiles;