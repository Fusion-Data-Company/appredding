import { useState } from "react";
import { useAdminContext } from "@/hooks/useAdmin/useAdminContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Filter, 
  RefreshCcw,
  Calendar,
  Image,
  Video,
  Edit,
  Eye,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Loader2
} from "lucide-react";

// Social media post type
interface SocialMediaPost {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  platform: string;
  scheduledDate: string;
  publishedDate?: string;
  status: string;
  campaignId?: number;
  analyticsData?: {
    likes?: number;
    comments?: number;
    shares?: number;
    views?: number;
  };
  createdBy: number;
  assignedTo?: number;
  createdAt: string;
  updatedAt: string;
  campaign?: {
    id: number;
    name: string;
  };
  createdByUser?: {
    id: number;
    firstName: string;
    lastName: string;
  };
  assignedToUser?: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

// Marketing campaign type
interface MarketingCampaign {
  id: number;
  name: string;
  description?: string;
  type: string;
  status: string;
  budget?: number;
  startDate?: string;
  endDate?: string;
  targetAudience?: any;
  goals?: any;
  results?: any;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  createdByUser?: {
    id: number;
    firstName: string;
    lastName: string;
  };
  posts?: number;
  platform?: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-800 border-green-300";
    case "scheduled":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "draft":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case "facebook":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "instagram":
      return "bg-pink-100 text-pink-800 border-pink-300";
    case "twitter":
      return "bg-sky-100 text-sky-800 border-sky-300";
    case "linkedin":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "youtube":
      return "bg-red-100 text-red-800 border-red-300";
    case "multiple":
      return "bg-purple-100 text-purple-800 border-purple-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "facebook":
      return <Facebook className="h-4 w-4" />;
    case "instagram":
      return <Instagram className="h-4 w-4" />;
    case "twitter":
      return <Twitter className="h-4 w-4" />;
    case "linkedin":
      return <Linkedin className="h-4 w-4" />;
    case "youtube":
      return <Youtube className="h-4 w-4" />;
    default:
      return null;
  }
};

export default function SocialMediaContent() {
  const { refreshData } = useAdminContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("posts");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [platformFilter, setPlatformFilter] = useState<string | null>(null);
  const queryClient = useQueryClient();
  
  // Fetch social media posts
  const { 
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
    refetch: refetchPosts
  } = useQuery({
    queryKey: ['/api/social-media', statusFilter, platformFilter],
    queryFn: async () => {
      let url = '/api/social-media';
      const params = new URLSearchParams();
      
      if (statusFilter) params.append('status', statusFilter);
      if (platformFilter) params.append('platform', platformFilter);
      
      if (params.toString()) {
        url += '?' + params.toString();
      }
      
      return await fetch(url).then(res => res.json());
    }
  });
  
  // Fetch marketing campaigns
  const { 
    data: campaigns,
    isLoading: campaignsLoading,
    isError: campaignsError,
    refetch: refetchCampaigns
  } = useQuery({
    queryKey: ['/api/marketing-campaigns'],
    queryFn: async () => {
      return await fetch('/api/marketing-campaigns').then(res => res.json());
    }
  });
  
  // Delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: async (postId: number) => {
      const response = await fetch(`/api/social-media/${postId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      return response;
    },
    onSuccess: () => {
      toast.success('Post deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['/api/social-media'] });
    },
    onError: (error) => {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  });
  
  // Delete campaign mutation
  const deleteCampaignMutation = useMutation({
    mutationFn: async (campaignId: number) => {
      const response = await fetch(`/api/marketing-campaigns/${campaignId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete campaign');
      }
      return response;
    },
    onSuccess: () => {
      toast.success('Campaign deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['/api/marketing-campaigns'] });
    },
    onError: (error) => {
      console.error('Error deleting campaign:', error);
      toast.error('Failed to delete campaign');
    }
  });
  
  // Handle refresh data
  const handleRefresh = () => {
    refetchPosts();
    refetchCampaigns();
    refreshData();
  };
  
  // Handle delete post
  const handleDeletePost = (postId: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePostMutation.mutate(postId);
    }
  };
  
  // Handle delete campaign
  const handleDeleteCampaign = (campaignId: number) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      deleteCampaignMutation.mutate(campaignId);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Social Media</h2>
          <p className="text-muted-foreground">
            Manage your social media content and campaigns
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleRefresh} size="sm" variant="outline" className="h-9">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="h-9">
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </div>
      </div>

      <Tabs 
        defaultValue="posts" 
        className="w-full"
        onValueChange={(value) => setActiveTab(value)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <TabsList className="h-9">
            <TabsTrigger value="posts" className="text-xs sm:text-sm">Posts</TabsTrigger>
            <TabsTrigger value="campaigns" className="text-xs sm:text-sm">Campaigns</TabsTrigger>
            <TabsTrigger value="calendar" className="text-xs sm:text-sm">Calendar</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs sm:text-sm">Analytics</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder={activeTab === "posts" ? "Search posts..." : "Search campaigns..."}
                className="pl-8 h-9 w-[200px] lg:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <TabsContent value="posts" className="m-0">
          <Card>
            <CardContent className="p-0">
              {postsLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : postsError ? (
                <div className="flex justify-center items-center h-64 text-center p-4">
                  <div>
                    <p className="text-red-500 mb-2">Failed to load social media posts</p>
                    <Button variant="outline" size="sm" onClick={() => refetchPosts()}>
                      <RefreshCcw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                </div>
              ) : posts && posts.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Post</TableHead>
                      <TableHead className="hidden md:table-cell">Platform</TableHead>
                      <TableHead className="hidden lg:table-cell">Media</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="hidden lg:table-cell">Campaign</TableHead>
                      <TableHead className="hidden sm:table-cell">Engagement</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.filter((post: SocialMediaPost) => {
                      return (
                        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        post.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (post.campaign?.name || '').toLowerCase().includes(searchQuery.toLowerCase())
                      );
                    }).map((post: SocialMediaPost) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{post.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {post.content}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-muted">
                              {getPlatformIcon(post.platform)}
                            </div>
                            <span className="capitalize">{post.platform}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex space-x-1">
                            {post.imageUrl && (
                              <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                                <Image className="h-3 w-3 mr-1" />
                                Image
                              </Badge>
                            )}
                            {post.videoUrl && (
                              <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                                <Video className="h-3 w-3 mr-1" />
                                Video
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`${getStatusColor(post.status)}`}
                          >
                            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              <span>{
                                post.status === "published" && post.publishedDate 
                                  ? new Date(post.publishedDate).toLocaleDateString() 
                                  : new Date(post.scheduledDate).toLocaleDateString()
                              }</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {post.status === "published" ? "Published" : "Scheduled"}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {post.campaign?.name || '-'}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {post.analyticsData ? (
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">{
                                (post.analyticsData.likes || 0) + 
                                (post.analyticsData.comments || 0) + 
                                (post.analyticsData.shares || 0) +
                                (post.analyticsData.views ? Math.floor(post.analyticsData.views / 100) : 0)
                              }</span>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Post
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Post
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="h-4 w-4 mr-2" />
                                Reschedule
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600" 
                                onClick={() => handleDeletePost(post.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex justify-center items-center h-64 text-center p-4">
                  <div>
                    <p className="text-muted-foreground mb-2">No social media posts found</p>
                    <Button className="h-9">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Post
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="m-0">
          <Card>
            <CardContent className="p-0">
              {campaignsLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : campaignsError ? (
                <div className="flex justify-center items-center h-64 text-center p-4">
                  <div>
                    <p className="text-red-500 mb-2">Failed to load marketing campaigns</p>
                    <Button variant="outline" size="sm" onClick={() => refetchCampaigns()}>
                      <RefreshCcw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                </div>
              ) : campaigns && campaigns.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead className="hidden md:table-cell">Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Date Range</TableHead>
                      <TableHead className="hidden sm:table-cell">Posts</TableHead>
                      <TableHead className="hidden md:table-cell">Primary Platform</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.filter((campaign: MarketingCampaign) => {
                      return (
                        campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (campaign.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (campaign.platform || '').toLowerCase().includes(searchQuery.toLowerCase())
                      );
                    }).map((campaign: MarketingCampaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{campaign.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {campaign.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {campaign.status ? (
                            <Badge 
                              variant="outline" 
                              className={getStatusColor(campaign.status || 'active')}
                            >
                              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                            </Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">Not set</span>
                          )}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {campaign.startDate && campaign.endDate ? (
                            <div className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              <span>
                                {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">No date set</span>
                          )}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {campaign.posts || 0}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {campaign.platform ? (
                            <Badge 
                              variant="outline" 
                              className={getPlatformColor(campaign.platform || 'other')}
                            >
                              {campaign.platform === "multiple" 
                                ? "Multiple" 
                                : campaign.platform.charAt(0).toUpperCase() + campaign.platform.slice(1)}
                            </Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">Not specified</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Campaign</DropdownMenuItem>
                              <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                              <DropdownMenuItem>Add Post</DropdownMenuItem>
                              <DropdownMenuItem>View Analytics</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteCampaign(campaign.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex justify-center items-center h-64 text-center p-4">
                  <div>
                    <p className="text-muted-foreground mb-2">No marketing campaigns found</p>
                    <Button className="h-9">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Campaign
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Calendar</CardTitle>
              <CardDescription>Schedule and view your social media posts</CardDescription>
            </CardHeader>
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
              <Calendar className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Calendar View</p>
              <p className="text-sm text-muted-foreground mt-1">
                This is a placeholder for the social media calendar view.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Analytics</CardTitle>
              <CardDescription>Track your social media performance</CardDescription>
            </CardHeader>
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
              <p className="text-muted-foreground">Analytics Dashboard</p>
              <p className="text-sm text-muted-foreground mt-1">
                This is a placeholder for the social media analytics dashboard.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}