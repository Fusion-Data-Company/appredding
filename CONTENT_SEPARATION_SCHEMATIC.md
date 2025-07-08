# Content Separation Schematic
## Solar Energy Platform - Home vs Technical Data Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        SOLAR ENERGY PLATFORM                            │
│                         apredding.net                                   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
            ┌───────▼────────┐            ┌────────▼────────┐
            │   HOME PAGE    │            │ TECHNICAL DATA  │
            │  (Marketing)   │            │ (Specifications)│
            └───────┬────────┘            └────────┬────────┘
                    │                               │
┌───────────────────┴───────────────┐ ┌────────────┴────────────────────┐
│         HOME PAGE SECTIONS        │ │    TECHNICAL DATA SECTIONS      │
├───────────────────────────────────┤ ├─────────────────────────────────┤
│                                   │ │                                 │
│ ✓ AdvancePowerHero               │ │ ✓ SpecificationsSection         │
│   • Contact form                  │ │   • Sol-Ark 12K/15K/30K/60K    │
│   • Value propositions            │ │   • Power outputs & MPPT        │
│   • Call-to-actions              │ │   • Technical features          │
│                                   │ │                                 │
│ ✓ ProductShowcaseSection         │ │ ✓ PowerFlowSection              │
│   • Visual imagery                │ │   • Energy flow diagrams        │
│   • No specifications             │ │   • System architecture         │
│                                   │ │                                 │
│ ✓ SolarSalesFunnelSection        │ │ ✓ EnergyStorageSection          │
│   • Lead capture forms            │ │   • API LiFePO4 specs           │
│   • Service categories            │ │   • Battery capacities          │
│   • Marketing messages            │ │   • BMS details                 │
│                                   │ │                                 │
│ ✓ AboutAdvancePowerSection       │ │ ✓ InteractiveToolsSection      │
│   • 25+ years experience         │ │   • Calculators                 │
│   • 500+ installations           │ │   • Technical tools             │
│   • Company values               │ │                                 │
│   • NO technical specs           │ │ ✓ TroubleshootingSection       │
│                                   │ │   • Fault codes                 │
│ ✓ SolarTestimonialsSection      │ │   • Technical FAQ               │
│   • Customer reviews              │ │   • Installation guides         │
│   • Success stories               │ │   • Configuration help          │
│                                   │ │                                 │
│ ✓ ContactSection                 │ │                                 │
│   • Contact information           │ │                                 │
│   • Business hours                │ │                                 │
│   • Location map                  │ │                                 │
│                                   │ │                                 │
└───────────────────────────────────┘ └─────────────────────────────────┘

## REMOVED FROM HOME PAGE:
┌─────────────────────────────────────────────────────────────────────────┐
│ ❌ SolarServicesSection → Moved technical content to Technical Data     │
│ ❌ FAQSection → Moved all Q&A to TroubleshootingSection                │
│ ⚠️  AboutAdvancePowerSection → Modified to remove technical specs      │
└─────────────────────────────────────────────────────────────────────────┘

## USER JOURNEY FLOW:
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Visitor    │────▶│  Home Page   │────▶│   Contact    │
│   Arrives    │     │ (Marketing)  │     │    Form      │
└──────────────┘     └──────┬───────┘     └──────────────┘
                            │
                            │ Needs Technical Info
                            ▼
                     ┌──────────────┐     ┌──────────────┐
                     │  Technical   │────▶│   Detailed   │
                     │    Data      │     │    Specs     │
                     └──────────────┘     └──────────────┘
```