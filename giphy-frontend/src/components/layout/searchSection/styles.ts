import styled from "styled-components";

export const Container = styled.div`
  align-items: center;
  column-gap: 10px;
  display: inline-flex;
  height: 150px;
  justify-content: center;
`;

export const StyledInput = styled.input`
  height: 20px;
`;

export const StyledButton = styled.button`
  display: flex;
`;

export const ModalOverlay = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background-color: gray;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-height: 80%;
  max-width: 80%;
  overflow: auto;
  padding: 20px;
`;
