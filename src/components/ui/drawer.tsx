"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

// const Drawer = ({
//   shouldScaleBackground = true,
//   ...props
// }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
//   <DrawerPrimitive.Root
//     shouldScaleBackground={shouldScaleBackground}
//     {...props}
//   />
// );
// Drawer.displayName = "Drawer";

const SurveyDrawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
SurveyDrawer.displayName = "Drawer";

// const DrawerTrigger = DrawerPrimitive.Trigger;
const SurveyDrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

// const DrawerContent = React.forwardRef<
//   React.ElementRef<typeof DrawerPrimitive.Content>,
//   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
// >(({ className, children, ...props }, ref) => (
//   <DrawerPortal>
//     <DrawerOverlay />
//     <DrawerPrimitive.Content
//       ref={ref}
//       className={cn(
//         "fixed inset-x-0 bottom-0 z-50 flex h-[300px] flex-col rounded-t-[10px] border bg-background",
//         className
//       )}
//       {...props}
//     >
//       <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
//       {children}
//     </DrawerPrimitive.Content>
//   </DrawerPortal>
// ));
// DrawerContent.displayName = "DrawerContent";

const SurveyDrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 flex h-[400px] flex-col rounded-t-[10px] border bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
SurveyDrawerContent.displayName = "DrawerContent";

// const DrawerHeader = ({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) => (
//   <div
//     className={cn("grid gap-1.5 p-4 ml-16 mr-auto", className)}
//     {...props}
//   />
// );
// DrawerHeader.displayName = "DrawerHeader";

const SurveyDrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-1.5 p-4 ml-16 mr-auto", className)} {...props} />
);
SurveyDrawerHeader.displayName = "DrawerHeader";

// const DrawerFooter = ({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) => (
//   <div
//     className={cn("mt-auto flex flex-col gap-2 p-4", className)}
//     {...props}
//   />
// );
// DrawerFooter.displayName = "DrawerFooter";

const SurveyDrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4 w-full", className)}
    {...props}
  />
);
SurveyDrawerFooter.displayName = "DrawerFooter";

// const DrawerTitle = React.forwardRef<
//   React.ElementRef<typeof DrawerPrimitive.Title>,
//   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
// >(({ className, ...props }, ref) => (
//   <DrawerPrimitive.Title
//     ref={ref}
//     className={cn(
//       "text-lg font-semibold leading-none tracking-tight text-xl",
//       className
//     )}
//     {...props}
//   />
// ));
// DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const SurveyDrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-xl",
      className
    )}
    {...props}
  />
));
SurveyDrawerTitle.displayName = DrawerPrimitive.Title.displayName;

// const DrawerDescription = React.forwardRef<
//   React.ElementRef<typeof DrawerPrimitive.Description>,
//   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
// >(({ className, ...props }, ref) => (
//   <DrawerPrimitive.Description
//     ref={ref}
//     className={cn("text-sm text-muted-foreground text-lg", className)}
//     {...props}
//   />
// ));
// DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

const SurveyDrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground text-lg", className)}
    {...props}
  />
));
SurveyDrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  // Drawer,
  SurveyDrawer,
  DrawerPortal,
  DrawerOverlay,
  // DrawerTrigger,
  SurveyDrawerTrigger,
  DrawerClose,
  // DrawerContent,
  SurveyDrawerContent,
  SurveyDrawerHeader,
  // DrawerHeader,
  // DrawerFooter,
  SurveyDrawerFooter,
  // DrawerTitle,
  SurveyDrawerTitle,
  // DrawerDescription,
  SurveyDrawerDescription,
};
