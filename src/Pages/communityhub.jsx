// import { useState, useRef } from "react";
// import React from "react";

// // Main App component
// export default function CommunityHub() {
//   // Mock data for initial posts
//   const [posts, setPosts] = useState([
//     {
//       id: crypto.randomUUID(),
//       author: "Alex",
//       avatar: "https://images.unsplash.com/photo-1549068106-b024baf5062d?w=200&h=200&fit=crop&q=80",
//       content: "I just finished reading an entire book! The audio version and a speed-reader app made all the difference. I feel so proud.",
//       type: "achievement",
//       timestamp: "2 hours ago",
//       color: "bg-[#C6D870]",
//       replies: [
//         { author: "You", content: "That's fantastic! I'd love to read it sometime." },
//         { author: "Chris", content: "Way to go, Alex! Your dedication is inspiring." },
//       ],
//     },
//     {
//       id: crypto.randomUUID(),
//       author: "Sam",
//       avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&h=200&fit=crop&q=80",
//       content: "I had a teacher make a joke about my spelling in front of the whole class. It was really embarrassing.",
//       type: "report",
//       timestamp: "1 hour ago",
//       color: "bg-[#FFC7A7]",
//       replies: [{ author: "You", content: "I'm so sorry that happened. That's completely unprofessional and unfair." }],
//     },
//     {
//       id: crypto.randomUUID(),
//       author: "Jamie",
//       avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&q=80",
//       content: "Passed my driving test today! The theory was a challenge, but I kept practicing and it paid off.",
//       type: "achievement",
//       timestamp: "3 days ago",
//       color: "bg-[#C6D870]",
//       replies: [{ author: "Chris", content: "Huge congrats, Jamie! You totally deserve it." }],
//     },
//   ]);

//   const [newPostContent, setNewPostContent] = useState("");
//   const [newPostType, setNewPostType] = useState("achievement");

//   // State to manage the visibility of the reporting modal
//   const [isReportModalOpen, setIsReportModalOpen] = useState(false);
//   const [reportPostId, setReportPostId] = useState(null);

//   // New state to manage the "report sent" pop-up visibility
//   const [isReportSentVisible, setIsReportSentVisible] = useState(false);

//   // Function to handle adding a new post
//   const handlePostSubmit = (e) => {
//     e.preventDefault();
//     if (newPostContent.trim()) {
//       const newPost = {
//         id: crypto.randomUUID(),
//         author: "You", // Assuming the user is "You" for this demo
//         avatar: "https://images.unsplash.com/photo-1549068106-b024baf5062d?w=200&h=200&fit=crop&q=80",
//         content: newPostContent,
//         type: newPostType,
//         timestamp: "Just now",
//         color: newPostType === "achievement" ? "bg-[#C6D870]" : "bg-[#FFC7A7]",
//         replies: [],
//       };
//       setPosts([newPost, ...posts]); // Add new post to the beginning of the feed
//       setNewPostContent("");
//     }
//   };

//   // Function to handle adding a new reply
//   const handleReplySubmit = (postId, replyContent) => {
//     if (!replyContent.trim()) return;

//     setPosts(
//       posts.map((post) =>
//         post.id === postId
//           ? {
//               ...post,
//               replies: [...post.replies, { author: "You", content: replyContent }],
//             }
//           : post
//       )
//     );
//   };

//   // Function to open the report modal
//   const handleOpenReportModal = (id) => {
//     setReportPostId(id);
//     setIsReportModalOpen(true);
//   };

//   // Function to close the report modal
//   const handleCloseReportModal = () => {
//     setIsReportModalOpen(false);
//     setReportPostId(null);
//   };

//   // Report submission handler (for demonstration purposes)
//   const handleReportSubmit = (reportReason) => {
//     console.log(`Report submitted for post ID ${reportPostId} with reason: ${reportReason}`);
//     handleCloseReportModal();

//     // Show the "report sent" pop-up
//     setIsReportSentVisible(true);

//     // Hide the pop-up after 3 seconds
//     setTimeout(() => {
//       setIsReportSentVisible(false);
//     }, 3000);
//   };

//   return (
//     <div className="min-h-screen bg-[#FDF7F5] font-sans text-[#B87C4C] p-4 sm:p-8 flex flex-col items-center">
//       <div className="w-full max-w-4xl">
//         <header className="py-8 text-center">
//           <h1 className="text-4xl sm:text-5xl font-bold">CommunityHub 👨‍👩‍👧‍👦</h1>
//           <p className="mt-2 text-lg sm:text-xl text-[#B87C4C] opacity-75">A place to share, celebrate, and support.</p>
//         </header>

//         {/* Post Creation Section */}
//         <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 w-full">
//           <form onSubmit={handlePostSubmit}>
//             <textarea
//               className="w-full h-24 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C6D870] resize-none text-gray-800"
//               placeholder="Share an achievement or report an unfair situation..."
//               value={newPostContent}
//               onChange={(e) => setNewPostContent(e.target.value)}
//             />
//             <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
//               <div className="flex items-center gap-4">
//                 <label className="text-gray-600">Post Type:</label>
//                 <div className="flex gap-2">
//                   <label className="inline-flex items-center cursor-pointer">
//                     <input
//                       type="radio"
//                       name="postType"
//                       value="achievement"
//                       checked={newPostType === "achievement"}
//                       onChange={() => setNewPostType("achievement")}
//                       className="form-radio text-[#C6D870] w-5 h-5"
//                     />
//                     <span className="ml-2 text-gray-700">Achievement</span>
//                   </label>
//                   <label className="inline-flex items-center cursor-pointer">
//                     <input
//                       type="radio"
//                       name="postType"
//                       value="report"
//                       checked={newPostType === "report"}
//                       onChange={() => setNewPostType("report")}
//                       className="form-radio text-[#B87C4C] w-5 h-5"
//                     />
//                     <span className="ml-2 text-gray-700">Report</span>
//                   </label>
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full sm:w-auto px-6 py-2 rounded-xl text-white font-semibold transition-transform duration-200 transform hover:scale-105"
//                 style={{ backgroundColor: newPostType === "achievement" ? "#C6D870" : "#B87C4C" }}
//               >
//                 Post
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Community Feed Section */}
//         <div className="space-y-6">
//           <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-[#B87C4C]">Community Feed</h2>
//           {posts.map((post) => (
//             <PostCard key={post.id} post={post} onReport={handleOpenReportModal} onReply={handleReplySubmit} />
//           ))}
//         </div>
//       </div>
//       {/* Report Modal */}
//       {isReportModalOpen && <ReportModal onClose={handleCloseReportModal} onReport={handleReportSubmit} />}

//       {/* "Report Sent" Pop-up */}
//       {isReportSentVisible && (
//         <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
//           <div className="bg-[#C6D870] text-gray-800 font-bold px-8 py-4 rounded-xl shadow-xl">Report sent! Thank you.</div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Component for an individual post card
// const PostCard = ({ post, onReport, onReply }) => {
//   const [showReply, setShowReply] = useState(false);
//   const [replyContent, setReplyContent] = useState("");

//   const handleReplyClick = () => {
//     setShowReply(!showReply);
//   };

//   const handleReplySubmit = (e) => {
//     e.preventDefault();
//     onReply(post.id, replyContent);
//     setReplyContent("");
//   };

//   return (
//     <div className={`rounded-3xl shadow-lg p-6 flex flex-col gap-4 ${post.color}`}>
//       {/* Post Content */}
//       <div className="flex items-start gap-4">
//         <img src={post.avatar} alt={`${post.author}'s avatar`} className="w-12 h-12 rounded-full border-2 border-white" />
//         <div className="flex-1 min-w-0">
//           <div className="flex justify-between items-center mb-1">
//             <span className="font-bold text-lg text-gray-800">{post.author}</span>
//             <span className="text-sm opacity-80 text-gray-800">{post.timestamp}</span>
//           </div>
//           <p className="text-gray-800 text-base leading-relaxed break-words">{post.content}</p>
//           <div className="mt-4 flex justify-end gap-2">
//             <button
//               onClick={handleReplyClick}
//               className="px-4 py-2 text-sm font-semibold rounded-full bg-white text-[#B87C4C] transition-transform duration-200 transform hover:scale-105"
//             >
//               Reply
//             </button>
//             <button
//               onClick={() => onReport(post.id)}
//               className="px-4 py-2 text-sm font-semibold rounded-full bg-white text-[#B87C4C] transition-transform duration-200 transform hover:scale-105"
//             >
//               Report
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Replies Section */}
//       {post.replies.length > 0 && (
//         <div className="ml-16 mt-4 space-y-4">
//           {post.replies.map((reply, index) => (
//             <div key={index} className="flex gap-2 items-start">
//               <span className="font-bold text-sm text-gray-800">{reply.author}:</span>
//               <p className="text-sm text-gray-700">{reply.content}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Reply Form */}
//       {showReply && (
//         <form onSubmit={handleReplySubmit} className="ml-16 mt-4 flex items-center gap-2">
//           <input
//             type="text"
//             value={replyContent}
//             onChange={(e) => setReplyContent(e.target.value)}
//             placeholder="Write a reply..."
//             className="flex-1 px-4 py-2 rounded-full text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C6D870]"
//           />
//           <button
//             type="submit"
//             className="px-4 py-2 text-sm rounded-full text-white font-semibold bg-[#B87C4C] transition-transform duration-200 transform hover:scale-105"
//           >
//             Send
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// // Component for the report modal
// const ReportModal = ({ onClose, onReport }) => {
//   const [reportReason, setReportReason] = useState("");

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
//         <h2 className="text-2xl font-bold text-[#B87C4C] mb-4">Report Post</h2>
//         <p className="text-gray-700 mb-4">Please provide a reason for your report.</p>
//         <textarea
//           className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B87C4C] resize-none text-gray-800"
//           value={reportReason}
//           onChange={(e) => setReportReason(e.target.value)}
//         />
//         <div className="mt-6 flex justify-end gap-4">
//           <button
//             onClick={onClose}
//             className="px-6 py-2 rounded-xl text-[#B87C4C] border border-[#B87C4C] font-semibold transition-transform duration-200 transform hover:scale-105"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => onReport(reportReason)}
//             className="px-6 py-2 rounded-xl text-white bg-[#B87C4C] font-semibold transition-transform duration-200 transform hover:scale-105"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useState } from "react";
import React from "react";
import "./CommunityHub.css"; // Import CSS file

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
    setTimeout(() => setIsReportSentVisible(false), 3000);
  };

  return (
    <div className="community-hub">
      <div className="container">
        <header className="header">
          <h1>CommunityHub 👨‍👩‍👧‍👦</h1>
          <p>A place to share, celebrate, and support.</p>
        </header>

        {/* Post Creation Section */}
        <div className="create-post">
          <form onSubmit={handlePostSubmit}>
            <textarea
              placeholder="Share an achievement or report an unfair situation..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              style={{ width: "90%" }}
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

      {isReportModalOpen && <ReportModal onClose={handleCloseReportModal} onReport={handleReportSubmit} />}

      {isReportSentVisible && <div className="popup">Report sent! Thank you.</div>}
    </div>
  );
}

// Post Card
const PostCard = ({ post, onReport, onReply }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleReplySubmit = (e) => {
    e.preventDefault();
    onReply(post.id, replyContent);
    setReplyContent("");
  };

  return (
    <div className={`post-card ${post.color}`}>
      <div className="post-main">
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

// Report Modal
const ReportModal = ({ onClose, onReport }) => {
  const [reportReason, setReportReason] = useState("");

  return (
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
