import React, { useState } from "react";
import AddIcon from "@strapi/icons/AddIcon";
import SearchIcon from "@strapi/icons/SearchIcon";
import SettingsIcon from "@strapi/icons/SettingsIcon";
import { AppLayout } from "../layouts/AppLayout";
import {
  GridLayout,
  HeaderLayout,
  Button,
  Main,
  KeyboardNavigable,
  ModalLayout,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@strapi/design-system";
import { TextButton } from "@strapi/design-system/Text";
import { MediaLibraryCard } from "../MediaLibrary/MediaLibraryCard";

function MediaLibraryPage() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <AppLayout>
        <Main labelledBy="header">
          <KeyboardNavigable tagName="article">
            <GridLayout
              header={
                <HeaderLayout
                  id="header"
                  primaryAction={
                    <Button
                      startIcon={<AddIcon />}
                      onClick={() => setIsVisible(true)}
                    >
                      Add an entry
                    </Button>
                  }
                  title="Media Library"
                  subtitle="36 assets"
                />
              }
              startActions={
                <>
                  <Button variant="tertiary">
                    <SearchIcon aria-label="Search" />
                  </Button>

                  <Button variant="tertiary">Sort by</Button>
                </>
              }
              endActions={
                <>
                  <Button variant="tertiary" startIcon={<SettingsIcon />}>
                    Settings
                  </Button>
                </>
              }
            >
              <MediaLibraryCard />
              <MediaLibraryCard />
              <MediaLibraryCard />
              <MediaLibraryCard />
              <MediaLibraryCard />
              <MediaLibraryCard />
              <MediaLibraryCard />
              <MediaLibraryCard />
              <MediaLibraryCard />
              <MediaLibraryCard />
            </GridLayout>
          </KeyboardNavigable>
        </Main>
      </AppLayout>
      {isVisible && (
        <ModalLayout onClose={() => setIsVisible(false)} labelledBy="title">
          <ModalHeader>
            <TextButton textColor="neutral800" as="h2" id="title">
              Title
            </TextButton>
          </ModalHeader>
          <ModalBody>Hello world</ModalBody>
          <ModalFooter
            startActions={<Button variant="tertiary">Cancel</Button>}
            endActions={
              <>
                <Button variant="secondary">Add new stuff</Button>
                <Button>Finish</Button>
              </>
            }
          />
        </ModalLayout>
      )}
    </>
  );
}

export default MediaLibraryPage;
