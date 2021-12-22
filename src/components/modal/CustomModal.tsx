import React from 'react';
import { Modal, Divider, ModalOverlay, ModalContent, ModalHeader } from '@chakra-ui/core';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  component: React.ComponentType<any>;
}

const CustomModal: React.FC<Props> = ({ isOpen, onClose, title, component: Component }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent
        width="calc(100% - 30px)"
        maxW="md"
        maxH="calc(100vh - 150px)"
        borderRadius="6px"
        overflow="auto"
      >
        <ModalHeader fontSize="md" color="customGreen.500" padding="10px 20px">
          {title}
        </ModalHeader>
        <Divider marginTop="0px" marginBottom="10px" />
        <Component onClose={onClose} />
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
