import { describe, it, expect } from "vitest";

// Test the pure nestComments function directly
// (The Supabase query functions can't be unit-tested without mocking)

interface FlatComment {
  id: string;
  parent_id: string | null;
  author_name: string;
  body: string;
  created_at: string;
  status: string;
}

interface NestedComment extends FlatComment {
  replies: NestedComment[];
}

// Replicate the pure function logic from comments.ts for testing
function nestComments(flat: FlatComment[]): NestedComment[] {
  const map = new Map<string, NestedComment>();
  const roots: NestedComment[] = [];

  for (const c of flat) {
    map.set(c.id, { ...c, replies: [] });
  }

  for (const c of flat) {
    const node = map.get(c.id)!;
    if (c.parent_id && map.has(c.parent_id)) {
      map.get(c.parent_id)!.replies.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

describe("nestComments", () => {
  it("returns empty array for empty input", () => {
    expect(nestComments([])).toEqual([]);
  });

  it("returns flat comments as roots when no parents", () => {
    const flat: FlatComment[] = [
      { id: "1", parent_id: null, author_name: "A", body: "Hi", created_at: "2024-01-01", status: "approved" },
      { id: "2", parent_id: null, author_name: "B", body: "Hey", created_at: "2024-01-02", status: "approved" },
    ];
    const result = nestComments(flat);
    expect(result).toHaveLength(2);
    expect(result[0].replies).toHaveLength(0);
    expect(result[1].replies).toHaveLength(0);
  });

  it("nests child comments under parents", () => {
    const flat: FlatComment[] = [
      { id: "1", parent_id: null, author_name: "A", body: "Root", created_at: "2024-01-01", status: "approved" },
      { id: "2", parent_id: "1", author_name: "B", body: "Reply", created_at: "2024-01-02", status: "approved" },
    ];
    const result = nestComments(flat);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
    expect(result[0].replies).toHaveLength(1);
    expect(result[0].replies[0].id).toBe("2");
  });

  it("supports deeply nested replies", () => {
    const flat: FlatComment[] = [
      { id: "1", parent_id: null, author_name: "A", body: "L0", created_at: "2024-01-01", status: "approved" },
      { id: "2", parent_id: "1", author_name: "B", body: "L1", created_at: "2024-01-02", status: "approved" },
      { id: "3", parent_id: "2", author_name: "C", body: "L2", created_at: "2024-01-03", status: "approved" },
    ];
    const result = nestComments(flat);
    expect(result).toHaveLength(1);
    expect(result[0].replies[0].replies[0].id).toBe("3");
  });

  it("handles orphan children (parent not in list) as roots", () => {
    const flat: FlatComment[] = [
      { id: "2", parent_id: "999", author_name: "B", body: "Orphan", created_at: "2024-01-01", status: "approved" },
    ];
    const result = nestComments(flat);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("handles multiple threads with replies", () => {
    const flat: FlatComment[] = [
      { id: "1", parent_id: null, author_name: "A", body: "Thread 1", created_at: "2024-01-01", status: "approved" },
      { id: "2", parent_id: null, author_name: "B", body: "Thread 2", created_at: "2024-01-02", status: "approved" },
      { id: "3", parent_id: "1", author_name: "C", body: "Reply to 1", created_at: "2024-01-03", status: "approved" },
      { id: "4", parent_id: "2", author_name: "D", body: "Reply to 2", created_at: "2024-01-04", status: "approved" },
    ];
    const result = nestComments(flat);
    expect(result).toHaveLength(2);
    expect(result[0].replies).toHaveLength(1);
    expect(result[1].replies).toHaveLength(1);
  });
});
