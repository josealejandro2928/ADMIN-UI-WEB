import { useRef } from 'react';
import { Text, Group, Button, createStyles, rem } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import classes from './DropZones.module.scss';


export function DropzoneButton({ onDrop }: { onDrop: (files: File[]) => void }) {
    const openRef = useRef<() => void>(null);

    return (
        <div className={classes.wrapper}>
            <Dropzone
                openRef={openRef}
                onDrop={onDrop}
                className={classes.dropzone}
                radius="md"
                accept={[MIME_TYPES.zip]}
                maxSize={30 * 1024 ** 2}
            >
                <div style={{ pointerEvents: 'none' }}>
                    <Group position="center">
                        <Dropzone.Accept>
                            <IconDownload
                                size={rem(50)}
                                stroke={1.5}
                            />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX size={rem(50)} stroke={1.5} />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <IconCloudUpload
                                size={rem(50)}
                                stroke={1.5}
                            />
                        </Dropzone.Idle>
                    </Group>

                    <Text ta="center" fw={700} fz="lg" mt="xl">
                        <Dropzone.Accept>Drop files here</Dropzone.Accept>
                        <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
                        <Dropzone.Idle>Upload Zip files</Dropzone.Idle>
                    </Text>
                    <Text ta="center" fz="sm" mt="xs" c="dimmed">
                        Drag and drop files here to upload. We can accept only <i>.zip</i> files that
                        are less than 30mb in size.
                    </Text>
                </div>
            </Dropzone>

            <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
                Select files
            </Button>
        </div>
    );
}