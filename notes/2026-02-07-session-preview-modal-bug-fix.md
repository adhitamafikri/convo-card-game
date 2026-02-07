# Session Preview Modal Bug Fix

**Date:** 2026-02-07
**Status:** ✅ Fixed
**Related:** Session Continuation Implementation

## Bug Description

**Reproduction Steps:**
1. User has active session
2. User leaves the room
3. User enters the main menu → preview modal appears ✓
4. User clicks "Mulai Baru" (Start New)
5. User picks theme and inputs players
6. User clicks "Mulai" button
7. **BUG:** Preview modal appears again before redirecting to game room

## Root Cause

The preview modal was using a computed value that showed the modal whenever a session existed:

```typescript
const shouldShowSessionPreview = showSessionPreview || hasExistingSession;
```

**Problem flow:**
1. User clicks "Mulai" → `initGame()` creates new session
2. `hasExistingSession` becomes `true` immediately
3. Computed value `shouldShowSessionPreview` becomes `true`
4. Modal appears again (unwanted behavior)
5. Navigation happens but modal flashes briefly

## Solution

Changed from computed value to explicit state management with one-time check:

```typescript
// Added flag to track initial session check
const [hasCheckedInitialSession, setHasCheckedInitialSession] = useState(false);

// Show preview only once on initial mount
useEffect(() => {
  if (!hasCheckedInitialSession && hasExistingSession) {
    setShowSessionPreview(true);
    setHasCheckedInitialSession(true);
  }
}, [hasCheckedInitialSession, hasExistingSession]);

// Modal controlled by explicit state only
{showSessionPreview && session && (
  <SessionPreviewModal ... />
)}
```

## Changes Made

**File:** `app/(main)/page.tsx`

1. ✅ Added `hasCheckedInitialSession` state flag
2. ✅ Added useEffect to check for existing session only on initial mount
3. ✅ Removed computed `shouldShowSessionPreview` value
4. ✅ Changed modal condition to use `showSessionPreview` directly

## Behavior After Fix

### Initial Mount with Existing Session
- Preview shows automatically (once)
- User can continue or start new

### Start New Game Flow (Fixed)
- User clicks "Mulai Baru"
- User picks theme and players
- User clicks "Mulai"
- **Preview does NOT appear again** ✅
- Navigates directly to game room

### Manual Trigger
- "MAIN SEKARANG" button still triggers preview if session exists
- Works via `handleMainButtonClick`

### No Session
- Preview does not show
- Goes directly to theme selection

## Technical Details

**Before:**
- Modal visibility: `shouldShowSessionPreview = showSessionPreview || hasExistingSession`
- Problem: Reactive to any session creation

**After:**
- Modal visibility: `showSessionPreview` (explicit state only)
- Initial check: One-time useEffect sets `showSessionPreview` on mount
- Subsequent checks: Manual via `handleMainButtonClick`

## Verification

- [x] Fixed the reported bug scenario
- [x] Initial session preview still works
- [x] Manual trigger via button still works
- [x] No session scenario still works
- [x] No unwanted modal flashes during navigation

## Conclusion

Bug fixed by replacing reactive computed value with explicit state management. The preview modal now only shows:
1. Once on initial mount (if session exists)
2. When explicitly triggered via button

This prevents the modal from appearing during new session creation flow.
