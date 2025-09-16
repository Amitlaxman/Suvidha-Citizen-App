# **App Name**: Sudhaaro

## Core Features:

- User Authentication: Secure sign-in/sign-up with Name, Phone Number, and Location. Optional anonymity toggle when reporting issues.
- Issue Reporting: Create a new report with: Title, Category (Flair), Severity (auto-suggested), Description (text or voice-to-text). Attach multimedia (photos/videos). Auto-location tagging via GPS. Generates a unique Problem ID for every submission.
- Automated Issue Routing: Route issues automatically to the appropriate department based on category and location metadata.
- AI-Assisted Smart Tagging: Use generative AI tool to suggest category and severity tags from user input and attachments.
- Real-time Issue Feed: Bottom nav "Home Feed" shows a scrollable, card-based list of issues. Each card includes issue title, image/video, category, location, severity, upvotes, and status. Sorting options: New, Most Severe, By Location, Resolved/Unresolved. Search bar for keywords and location filtering.
- Interactive Map View: Optional toggle in Feed to see issues on a map with location pins. Clicking a pin shows issue details and upvote option.
- Upvote Issues: Citizens can upvote issues to increase their priority. Simple animation confirms the action.
- Track My Problems: Dedicated section in bottom nav for users to view and track their submitted issues. Status stages: Submitted → Acknowledged → In Progress → Resolved. Timeline/checkpoints visible for each issue.
- Notifications: In-app real-time notifications for problem updates. SMS fallback for critical events (Acknowledged, Resolved). Multi-channel (push + SMS).
- Multilingual Support: Toggle on every page to switch between Hindi and English.

## Style Guidelines:

- Primary color: Moderate cyan (#4FC3F7) – trust, transparency, civic duty.
- Background color: Light cyan (#E0F7FA) – soft and clean.
- Accent color: Deep sky blue (#03A9F4) – used for highlights and key actions.
- Typography: "PT Sans" (Google Fonts) for body and headlines – modern yet approachable.
- Icons: Material Design icons for consistency and clarity.
- Layout: Card-based design for issues (title, multimedia, metadata, upvotes, status).
- Animations: Subtle transitions (page navigation, upvote feedback, status change updates).
- Navigation: Bottom nav bar with 3 options: Home Feed (scroll + map toggle), Create Post (report issue), Track My Problems (user’s submissions + status)