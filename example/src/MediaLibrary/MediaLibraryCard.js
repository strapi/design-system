import React from "react";
import {
  Card,
  CardHeader,
  CardAction,
  CardAsset,
  CardTimer,
  CardBody,
  CardContent,
  CardTitle,
  CardSubtitle,
  CardBadge,
  CardCheckbox,
  IconButton,
} from "@strapi/design-system";
import EditIcon from "@strapi/icons/EditIcon";

const STATIC_IMAGE = `https://c4.wallpaperflare.com/wallpaper/600/28/14/flat-design-illustration-wallpaper-preview.jpg`;

export const MediaLibraryCard = () => (
  <Card>
    <CardHeader>
      <CardCheckbox value={true} />
      <CardAction position="end">
        <IconButton icon={<EditIcon />} label="Edit the thing" />
      </CardAction>
      <CardAsset src={STATIC_IMAGE} />
      <CardTimer>05:39</CardTimer>
    </CardHeader>
    <CardBody>
      <CardContent>
        <CardTitle>File name</CardTitle>
        <CardSubtitle>PNG - 400✕400</CardSubtitle>
      </CardContent>
      <CardBadge>Doc</CardBadge>
    </CardBody>
  </Card>
);
