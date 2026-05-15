---
name: Elite Tournament Suite
colors:
  surface: '#fbf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fbf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f4'
  surface-container: '#f0edef'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e4e2e3'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45474c'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f73'
  primary: '#091426'
  on-primary: '#ffffff'
  primary-container: '#1e293b'
  on-primary-container: '#8590a6'
  inverse-primary: '#bcc7de'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#201100'
  on-tertiary: '#ffffff'
  tertiary-container: '#3c2300'
  on-tertiary-container: '#c88000'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e3fb'
  primary-fixed-dim: '#bcc7de'
  on-primary-fixed: '#111c2d'
  on-primary-fixed-variant: '#3c475a'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#fbf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e3'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  sidebar_width: 20%
  main_content_width: 55%
  widget_panel_width: 25%
  grid_gap: 24px
  container_padding: 32px
  stack_sm: 8px
  stack_md: 16px
  stack_lg: 24px
---

## Brand & Style

This design system is engineered for a premium, high-stakes sporting environment. The brand personality is authoritative, precise, and sophisticated—mirroring the world-class nature of the World Cup. It targets a discerning audience that demands real-time data clarity and professional-grade aesthetics.

The visual style is **Corporate Modern with a Minimalist lean**. It prioritizes high legibility and a focused information hierarchy. By utilizing generous white space and a structured 3-column layout, the interface reduces cognitive load during high-traffic match days. The emotional response is one of reliability and exclusivity, using a deep navy foundation contrasted against crisp action colors to signal importance and interactivity.

## Colors

The palette is anchored by **Slate Navy (#1E293B)**, used for the primary text and the sidebar to provide a strong, grounding frame for the application. The background utilizes a cool, light grey **#F4F6F9** to minimize eye strain and differentiate content cards from the canvas.

**Action Blue (#3B82F6)** is reserved strictly for primary interactions, call-to-actions, and interactive states. **Trophy Gold (#F59E0B)** serves as the high-visibility highlight color, used sparingly for live indicators, scores, and winning team designations. This separation of concerns ensures that functional actions and informational highlights never compete for the user's attention.

## Typography

The design system exclusively utilizes **Inter**, a typeface designed for screens, to ensure maximum clarity of complex statistics and scores. The type scale is built on a high-contrast ratio to distinguish between live data and static labels.

- **Display & Headlines:** Use semi-bold and bold weights with tighter letter spacing to create a commanding presence for match titles and major news.
- **Body Copy:** Set with generous line heights to facilitate long-form reading of match reports and analysis.
- **Data Labels:** Utilize the medium weight at smaller scales, often in uppercase, to categorize statistics without overwhelming the primary numerical data.

## Layout & Spacing

The design system employs a **Fixed 3-Column Grid** optimized for a 1440px desktop breakpoint. The layout logic is strictly enforced to maintain a professional editorial feel:

1.  **Sidebar (20%):** Permanent navigation and user profile, anchored in the primary navy color.
2.  **Main Content (55%):** The primary feed of match data, live updates, and news cards.
3.  **Widgets (25%):** Secondary information including group standings, top scorers, and betting odds.

A consistent **24px grid gap** is maintained between all major layout blocks. Internal component spacing follows an 8px modular scale to ensure mathematical harmony across the interface.

## Elevation & Depth

To maintain the clean, professional aesthetic, this design system uses **Subtle Tonal Elevation** combined with light shadows. 

- **Surface Level:** The main background is the lowest tier (#F4F6F9).
- **Content Cards:** Components sit on white (#FFFFFF) surfaces with a 1px stroke (#E2E8F0) and a soft, diffused shadow (0px 4px 12px rgba(30, 41, 59, 0.05)).
- **Sidebar:** Elevated through color contrast rather than shadow, creating a solid "anchor" for the layout.
- **Overlays:** Modals and dropdowns use a more pronounced shadow (0px 10px 25px rgba(30, 41, 59, 0.1)) to indicate a break from the primary 3-column grid.

## Shapes

The shape language is defined by an **8px (0.5rem) base radius**, categorized as "Rounded." This curvature strikes a balance between the precision of a data-heavy application and the approachability of a premium consumer product. 

- **Cards & Containers:** Follow the standard 8px radius.
- **Action Buttons:** Use the 8px radius for a sturdy, professional look.
- **Tags & Status Badges:** Use a fully rounded "pill" shape to distinguish them from interactive buttons.

## Components

- **Buttons:** Primary buttons are Solid Blue (#3B82F6) with White text. Secondary buttons use a Slate Navy outline. All buttons feature a 150ms transition on hover with a subtle brightness increase.
- **Match Cards:** White background, 8px radius, featuring the 24px gap for internal padding. Team flags should be rendered with a 4px radius.
- **Sidebar Nav:** High-contrast white text on navy background. Active states use a left-aligned Gold (#F59E0B) 4px border-accent.
- **Score Indicators:** Use the Highlight Gold (#F59E0B) for live match clocks or "Go" indicators to draw immediate focus.
- **Inputs:** Clean white fills with a 1px border (#CBD5E1). Focus states utilize an Action Blue (#3B82F6) ring.
- **Data Tables:** Borderless rows with subtle #F4F6F9 dividers. Header rows should be in uppercase Label-sm typography for a professional finish.