import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import dynamic from "next/dynamic";

const PricingCodeComponent = dynamic(
    () => import("./code-components/Pricing"),
    { ssr: false }
);
const DataCenterPricingCodeComponent = dynamic(
    () => import("./code-components/DataCenterPricing"),
    { ssr: false }
);

const CalculatorCodeComponent = dynamic(
    () => import("./code-components/Calculator"),
    { ssr: false }
);
const CalculatorComponent = dynamic(
    () => import("./code-components/CalculatorNew"),
    { ssr: false }
);

const YoutubeThumbnail = dynamic(
    () => import("./code-components/Youtube").then((mod) => mod.YoutubeThumbnail),
    { ssr: false }
);
const ReactYoutube = dynamic(
    () => import("./code-components/Youtube").then((mod) => mod.ReactYoutube),
    { ssr: false }
);

const Carousel = dynamic(() => import("./code-components/carousel"), {
  ssr: false,
});

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "aLd7YPsrusJtnKKQ1K4KhA",
      token:
          "Tz0K2f5BuMYboZr7YN36pvRKPyQHqMR72hthNolKb2OkW3RONwSWYSRcrQA0HPtWgQZGflhaAphT3o0kEg",
    },
  ],
  preview: false,
});

PLASMIC.registerComponent(PricingCodeComponent, {
  name: "Pricing Code Component",
  props: {
    verbose: "boolean",
    children: "slot",
  },
});

PLASMIC.registerComponent(CalculatorCodeComponent, {
  name: "Calculator Code Component",
  props: {
    verbose: "boolean",
    children: "slot",
  },
});

PLASMIC.registerComponent(CalculatorComponent, {
  name: "Calculator Component",
  props: {
    verbose: "boolean",
    children: "slot",
  },
});

PLASMIC.registerComponent(DataCenterPricingCodeComponent, {
  name: "Data Center Pricing Code Component",
  props: {
    verbose: "boolean",
    children: "slot",
  },
});

PLASMIC.registerComponent(YoutubeThumbnail, {
  name: "YoutubeThumbnail",
  props: {
    videoId: "string",
    customStyle: "object",
  },
  importPath: "./code-components/Youtube",
});

PLASMIC.registerComponent(ReactYoutube, {
  name: "ReactYoutube",
  props: {
    videoId: {
      type: "string",
      defaultValue: "R6MeLqRQzYw",
      displayName: "Video ID",
      description: "The ID for the YouTube video",
    },
    controls: {
      type: "boolean",
      displayName: "Show Controls",
      description:
          "Whether the YouTube video player controls should be displayed",
      defaultValueHint: true,
    },
    autoplay: {
      type: "boolean",
      displayName: "Auto Play",
      description:
          "Whether the video should automatically start playing when the player loads",
      defaultValueHint: false,
      hidden: function hidden(props) {
        return !props.mute;
      },
    },
    mute: {
      type: "boolean",
      displayName: "Mute",
      description: "Whether the video should be muted",
      defaultValueHint: false,
    },
    lazyLoading: {
      type: "boolean",
      displayName: "LazyLoading",
      description: "Whether the iframe should be lazy-loaded",
      defaultValueHint: true,
    },
    start: {
      type: "number",
      displayName: "Start",
      description:
          "The video should begin at this amount of seconds from the start of the video",
      defaultValueHint: 0,
    },
    end: {
      type: "number",
      displayName: "End",
      description:
          "Stop playing the video after this amount of seconds (measured from the start of the video)",
    },
  },
  importPath: "./code-components/Youtube",
});

PLASMIC.registerComponent(Carousel, {
  name: "Carousel",
  displayName: "Carousel",
  importPath: "./code-components/carousel",
  importName: "Carousel",
  isDefaultExport: true,
  props: {
    children: {
      type: "slot",
      // hidePlaceholder: true,
    },
    dotSlot: {
      type: "slot",
      // hidePlaceholder: true,
    },
    dotSlotWrapperStyle: {
      type: "object",
      defaultValue: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      },
    },
    sliderWrapperStyle: {
      type: "object",
      defaultValue: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        rowGap: "16px",
        width: "100%",
      },
    },
    slideWrapperStyle: {
      type: "object",
      defaultValue: {
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    nextArrow: {
      type: "slot",
      defaultValue: [
        {
          type: "button",
          value: "Next",
        },
      ],
    },
    prevArrow: {
      type: "slot",
      defaultValue: [
        {
          type: "button",
          value: "Prev",
        },
      ],
    },
    arrows: {
      displayName: "Arrows",
      type: "boolean",
      description: "Show next/prev arrows",
      defaultValue: true,
      defaultValueHint: true,
    },
    autoplay: {
      displayName: "Auto Play",
      type: "boolean",
      description: "Automatically start scrolling",
      defaultValueHint: true,
    },
    autoplaySpeed: {
      displayName: "Auto Play Speed",
      type: "number",
      description: "Delay between each auto scroll, in milliseconds",
      defaultValueHint: 3000,
      hidden: (props: any) => !props.autoplay,
    },
    dots: {
      displayName: "Dots",
      type: "boolean",
      description: "Show dots for each slide",
      defaultValueHint: true,
    },
    easing: {
      displayName: "Easing",
      type: "string",
      description: "Easing method for transition",
      defaultValueHint: "linear",
    },
    fade: {
      displayName: "Fade",
      type: "boolean",
      description: "Cross-fade between slides",
      defaultValueHint: false,
    },
    focusOnSelect: {
      displayName: "Focus On Select",
      type: "boolean",
      description: "Go to slide on click",
      defaultValueHint: false,
    },
    infinite: {
      displayName: "Infinite",
      type: "boolean",
      description: "Infinitely wrap around contents",
      defaultValueHint: true,
    },
    initialSlide: {
      displayName: "Initial Slide",
      type: "number",
      description: "Index of initial slide",
      defaultValueHint: 0,
    },
    lazyLoad: {
      displayName: "Lazy Load",
      type: "choice",
      options: ["ondemand", "progressive"],
      description:
          "Load images or render components on demand or progressively",
    },
    pauseOnDotsHover: {
      displayName: "Pause On Dots Hover",
      type: "boolean",
      description: "Prevents autoplay while hovering on dots",
      defaultValueHint: false,
    },
    pauseOnFocus: {
      displayName: "Pause On Focus",
      type: "boolean",
      description: "Prevents autoplay while focused on slides",
      defaultValueHint: false,
    },
    pauseOnHover: {
      displayName: "Pause On Hover",
      type: "boolean",
      description: "Prevents autoplay while hovering on track",
      defaultValueHint: true,
    },
    rows: {
      displayName: "Rows",
      type: "number",
      description: "Number of rows per slide (enables grid mode)",
      defaultValueHint: 1,
    },
    rtl: {
      displayName: "Reverse",
      type: "boolean",
      description: "Reverses the slide order",
      defaultValueHint: false,
    },
    slidesPerRow: {
      displayName: "Slides Per Row",
      type: "number",
      description:
          "Number of slides to display in grid mode, this is useful with rows option",
      defaultValueHint: 1,
    },
    slidesToScroll: {
      displayName: "Slides To Scroll",
      type: "number",
      description: "Number of slides to scroll at once",
      defaultValueHint: 1,
    },
    slidesToShow: {
      displayName: "Slides To Show",
      type: "number",
      description: "Number of slides to show in one frame",
      defaultValueHint: 1,
    },
    speed: {
      displayName: "Speed",
      type: "number",
      description: "Transition speed in milliseconds",
      defaultValueHint: 500,
    },
    swipe: {
      displayName: "Swipe",
      type: "boolean",
      description: "Enable swiping to change slides",
      defaultValueHint: true,
    },
    swipeToSlide: {
      displayName: "Swipe To Slide",
      type: "boolean",
      description: "Enable drag/swipe irrespective of 'slidesToScroll'",
      defaultValueHint: false,
    },
    touchMove: {
      displayName: "Touch Move",
      type: "boolean",
      description: "Enable slide moving on touch",
      defaultValueHint: true,
    },
    touchThreshold: {
      displayName: "Touch Threshold",
      type: "number",
      description: "Swipe distance threshold in pixels",
      defaultValueHint: 5,
    },
    useCSS: {
      displayName: "Use CSS",
      type: "boolean",
      description: "Enable/Disable CSS Transitions",
      defaultValueHint: true,
    },
    useTransform: {
      displayName: "Use Transform",
      type: "boolean",
      description: "Enable/Disable CSS Transforms",
      defaultValueHint: true,
    },
    variableWidth: {
      displayName: "Variable Width",
      type: "boolean",
      description: "Variable width slides",
      defaultValueHint: false,
    },
    vertical: {
      displayName: "Vertical",
      type: "boolean",
      description: "Vertical slide mode",
      defaultValueHint: false,
    },
  },
  defaultStyles: {
    width: "stretch",
    maxWidth: "100%",
  },
});
