import { useState } from "react";
import React from "react";
// Assuming you have saved the final CSS as CommunityHub.css
import "./CommunityHub.css"; 

// Main App component
export default function CommunityHub() {
  // Mock data for initial posts
  const [posts, setPosts] = useState([
    {
      id: crypto.randomUUID(),
      author: "Alex",
      avatar: "https://images.unsplash.com/photo-1549068106-b024baf5062d?w=200&h=200&fit=crop&q=80",
      content: "I just finished reading an entire book! The audio version and a speed-reader app made all the difference. I feel so proud.",
      type: "achievement",
      timestamp: "2 hours ago",
      // Using CSS class name for styling
      color: "achievement", 
      replies: [
        { author: "You", content: "That's fantastic! I'd love to read it sometime." },
        { author: "Chris", content: "Way to go, Alex! Your dedication is inspiring." },
      ],
    },
    {
      id: crypto.randomUUID(),
      author: "Sam",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&h=200&fit=crop&q=80",
      content: "I had a teacher make a joke about my spelling in front of the whole class. It was really embarrassing.",
      type: "report",
      timestamp: "1 hour ago",
      // Using CSS class name for styling
      color: "report", 
      replies: [{ author: "You", content: "I'm so sorry that happened. That's completely unprofessional and unfair." }],
    },
    {
      id: crypto.randomUUID(),
      author: "Jamie",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&q=80",
      content: "Passed my driving test today! The theory was a challenge, but I kept practicing and it paid off.",
      type: "achievement",
      timestamp: "3 days ago",
      // Using CSS class name for styling
      color: "achievement", 
      replies: [{ author: "Chris", content: "Huge congrats, Jamie! You totally deserve it." }],
    },
  ]);

  const [newPostContent, setNewPostContent] = useState("");
  const [newPostType, setNewPostType] = useState("achievement");

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportPostId, setReportPostId] = useState(null);
  const [isReportSentVisible, setIsReportSentVisible] = useState(false);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPostContent.trim()) {
      const newPost = {
        id: crypto.randomUUID(),
        author: "You",
        avatar: "https://images.unsplash.com/photo-1549068106-b024baf5062d?w=200&h=200&fit=crop&q=80",
        content: newPostContent,
        type: newPostType,
        timestamp: "Just now",
        color: newPostType === "achievement" ? "achievement" : "report",
        replies: [],
      };
      setPosts([newPost, ...posts]);
      setNewPostContent("");
    }
  };

  const handleReplySubmit = (postId, replyContent) => {
    if (!replyContent.trim()) return;

    setPosts(posts.map((post) => (post.id === postId ? { ...post, replies: [...post.replies, { author: "You", content: replyContent }] } : post)));
  };

  const handleOpenReportModal = (id) => {
    setReportPostId(id);
    setIsReportModalOpen(true);
  };

  const handleCloseReportModal = () => {
    setIsReportModalOpen(false);
    setReportPostId(null);
  };

  const handleReportSubmit = (reportReason) => {
    console.log(`Report submitted for post ID ${reportPostId} with reason: ${reportReason}`);
    handleCloseReportModal();
    setIsReportSentVisible(true);
    // Hide the pop-up after 3 seconds
    setTimeout(() => setIsReportSentVisible(false), 3000);
  };

  return (
    // Applied main CSS class
    <div className="community-hub">
      <div className="container">
        {/* Applied header CSS class */}
        <header className="header">
          <h1>CommunityHub 👨‍👩‍👧‍👦</h1>
          <p>A place to share, celebrate, and support.</p>
        </header>

        {/* Applied post creation CSS class */}
        <div className="create-post">
          <form onSubmit={handlePostSubmit}>
            <textarea
              placeholder="Share an achievement or report an unfair situation..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              // Removed inline style and rely on CSS class
            />
            <div className="form-actions">
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="postType"
                    value="achievement"
                    checked={newPostType === "achievement"}
                    onChange={() => setNewPostType("achievement")}
                  />
                  Achievement
                </label>
                <label>
                  <input type="radio" name="postType" value="report" checked={newPostType === "report"} onChange={() => setNewPostType("report")} />
                  Report
                </label>
              </div>
              <button
                type="submit"
                // The background style must be maintained here as it changes dynamically based on post type
                style={{
                  backgroundColor: newPostType === "achievement" ? "#C6D870" : "#B87C4C",
                }}
              >
                Post
              </button>
            </div>
          </form>
        </div>

        {/* Feed Section */}
        <div className="feed">
          <h2>Community Feed</h2>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onReport={handleOpenReportModal} onReply={handleReplySubmit} />
          ))}
        </div>
      </div>

      {/* Report Modal */}
      {isReportModalOpen && <ReportModal onClose={handleCloseReportModal} onReport={handleReportSubmit} />}

      {/* "Report Sent" Pop-up - Updated for corner card style */}
      {isReportSentVisible && (
        <div className="popup">
          {/* CRITICAL: Use the specific CSS class for the card style */}
          <div className="report-popup-card">Report sent! Thank you.</div>
        </div>
      )}
    </div>
  );
}

// Component for an individual post card
const PostCard = ({ post, onReport, onReply }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleReplySubmit = (e) => {
    e.preventDefault();
    onReply(post.id, replyContent);
    setReplyContent("");
  };

  return (
    // Applied post card CSS class with dynamic color/type class
    <div className={`post-card ${post.color}`}>
      <div className="post-main">
        {/* Applied avatar CSS class */}
        <img src={post.avatar} alt={post.author} className="avatar" />
        <div className="post-body">
          <div className="post-header">
            <span className="author">{post.author}</span>
            <span className="timestamp">{post.timestamp}</span>
          </div>
          <p>{post.content}</p>
          <div className="actions">
            <button onClick={() => setShowReply(!showReply)}>Reply</button>
            <button onClick={() => onReport(post.id)}>Report</button>
          </div>
        </div>
      </div>

      {/* Replies */}
      {post.replies.length > 0 && (
        <div className="replies">
          {post.replies.map((reply, i) => (
            <div key={i} className="reply">
              <span className="reply-author">{reply.author}:</span>
              <p>{reply.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* Reply form */}
      {showReply && (
        <form onSubmit={handleReplySubmit} className="reply-form">
          <input type="text" value={replyContent} onChange={(e) => setReplyContent(e.target.value)} placeholder="Write a reply..." />
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
};

// Component for the report modal
const ReportModal = ({ onClose, onReport }) => {
  const [reportReason, setReportReason] = useState("");

  return (
    // Applied modal CSS classes
    <div className="modal-overlay">
      <div className="modal">
        <h2>Report Post</h2>
        <p>Please provide a reason for your report.</p>
        <textarea value={reportReason} onChange={(e) => setReportReason(e.target.value)} />
        <div className="modal-actions">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="submit" onClick={() => onReport(reportReason)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};