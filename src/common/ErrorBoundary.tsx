
import { Container,Text } from "@mantine/core";
import * as React from "react";

export class ErrorBoundary extends React.Component<Props> {
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  override state: State = { error: undefined };

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
  }

  override render() {
    const { error } = this.state;

    if (!error) {
      return this.props.children;
    }

    return (
      <Container sx={{ marginTop: "43vh" }}>
        <Container>
          <Text>
            <strong>Error {error.status || 500}</strong>: {error.message}
          </Text>
        </Container>
      </Container>
    );
  }
}

type Props = {
  children: React.ReactNode;
};

type State = {
  error: (Error & { status?: number }) | undefined;
};
