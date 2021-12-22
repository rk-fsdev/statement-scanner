import React, { useContext, useCallback, useState } from 'react';
import { ModalBody, ButtonGroup, Button, Box, Image, Text } from '@chakra-ui/core';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { AppContext, AppActionTypes } from 'services/context/appContext';
import MerchantCategoryIdSelection from './MerchantCategoryIdSelection';
import { awsConfig } from 'services/config/aws';
import { AiFillCloseCircle } from 'react-icons/ai';
import { StatementInput, Statement, StatementState } from 'model/statement';
import { STATEMENT_CREATE } from 'services/graphql/statement/mutation';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const S3 = require('react-s3');

interface Props {
  onClose: () => void;
  categoryId: string;
  groupId: string;
}

const UploadStatementModal: React.FC<Props> = ({
  categoryId,
  groupId,
  onClose,
  ...restProps
}: Props) => {
  const history = useHistory();
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [isUploading, setUploading] = useState<boolean>(false);

  const [
    statementCreate,
    { error: statementCreateError, loading: isStatementCreating },
  ] = useMutation<{ statementCreate: Statement }, { input: StatementInput }>(STATEMENT_CREATE);
  const { dispatch } = useContext(AppContext);

  const onDrop = useCallback((acceptedFiles) => {
    setUploadFiles((prevUploadFiles: File[]) => {
      return prevUploadFiles.concat(
        acceptedFiles.map((file: any) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUploadClick = () => {
    const documentUrls: string[] = [];
    setUploading(true);
    uploadFiles.forEach(async (file: File) => {
      try {
        const _data = await S3.uploadFile(file, awsConfig);
        documentUrls.push(_data.location);
        if (documentUrls.length === uploadFiles.length) {
          setUploading(false);
          try {
            const { data } = await statementCreate({
              variables: {
                input: {
                  suggestedMerchantCategoryId: categoryId,
                  documentUrls,
                  state: StatementState.QUEUED,
                },
              },
            });
            if (data && data.statementCreate) {
              history.push(`/statements/${data.statementCreate.id}`);
              onClose();
            }
          } catch (e) {
            console.log(e);
          }
        }
      } catch {
        alert('Failed to upload files to the server.');
      }
    });
  };

  const handleBackClick = () => {
    dispatch({
      type: AppActionTypes.SET_MODAL_CONTENT,
      payload: {
        modalTitle: 'Upload New Statement',
        modalContent: (props) => <MerchantCategoryIdSelection {...props} groupId={groupId} />,
      },
    });
  };

  const handleRemoveClick = (idx: number) => {
    setUploadFiles((prevUploadFiles) => {
      const files = [...prevUploadFiles];
      files.splice(idx, 1);
      return files;
    });
  };

  if (statementCreateError)
    return (
      <Box padding="10px 20px" textTransform="capitalize">
        {statementCreateError.message}
        <Box textAlign="right">
          <Button variant="solid" variantColor="green" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    );

  return (
    <ModalBody {...restProps}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Button
          variant="link"
          variantColor="green"
          textDecor="underline"
          maxW="100%"
          wordBreak="break-all"
          whiteSpace="normal"
        >
          <Text>Click to select the statement image(s) for analysis.</Text>
        </Button>
      </div>
      <Box
        d="grid"
        gridColumnGap="10px"
        gridRowGap="10px"
        gridAutoRows="60px"
        gridTemplateColumns="repeat(auto-fill, minmax(60px, 1fr))"
        marginTop="15px"
      >
        {uploadFiles.length > 0 &&
          uploadFiles.map((file: any, idx) => (
            <Box key={idx} position="relative">
              <Image
                src={file.preview}
                alt={file.path}
                width="100%"
                height="100%"
                borderRadius="5px"
                border="1px solid"
                borderColor="gray.500"
              />
              <Button
                variant="link"
                position="absolute"
                right="0"
                top="0"
                padding="0px"
                width="30px"
                minWidth="30px"
                height="30px"
                variantColor="green"
                borderRadius="50%"
                onClick={() => handleRemoveClick(idx)}
              >
                <AiFillCloseCircle fontSize="30px" />
              </Button>
            </Box>
          ))}
      </Box>
      <ButtonGroup d="flex" justifyContent="space-between" marginTop="20px">
        <Button
          isDisabled={isUploading || isStatementCreating}
          variant="outline"
          variantColor="gray"
          fontSize="sm"
          borderColor="customGray.600"
          color="customGray.600"
          onClick={handleBackClick}
        >
          Back
        </Button>
        <Button
          isLoading={isUploading || isStatementCreating}
          variant="solid"
          variantColor="green"
          fontSize="sm"
          onClick={handleUploadClick}
          isDisabled={uploadFiles.length < 1}
        >
          Upload
        </Button>
      </ButtonGroup>
    </ModalBody>
  );
};

export default UploadStatementModal;
