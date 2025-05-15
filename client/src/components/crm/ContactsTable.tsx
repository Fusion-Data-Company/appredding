import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Contact, contactStatusEnum, leadSourceEnum, Company } from "@shared/schema";
import { Loader2, Search, Filter, ChevronDown, ChevronUp, MoreHorizontal, AlertTriangle, RefreshCcw, UserX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ContactDrawer from "../crm/ContactDrawer";

// Extended Contact type that includes populated company relation
type ContactWithCompany = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  mobilePhone: string | null;
  jobTitle: string | null;
  department: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  country: string | null;
  website: string | null;
  source: string | null;
  status: string | null;
  interestedInApplications?: string[] | null;
  notes: string | null;
  birthday: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  lastContactedDate: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: number | null;
  assignedTo: number | null;
  company?: Company;
  companyId?: number;
}

const applicationTypes = [
  { value: "painter_network", label: "Painter Network", color: "bg-blue-500" },
  { value: "marina", label: "Marina", color: "bg-cyan-500" },
  { value: "fire_prevention", label: "Fire Prevention", color: "bg-red-500" },
  { value: "pool", label: "Pool", color: "bg-green-500" },
  { value: "construction", label: "Construction", color: "bg-yellow-500" },
  { value: "mobile_home", label: "Mobile Home", color: "bg-purple-500" },
  { value: "municipality", label: "Municipality", color: "bg-orange-500" },
  { value: "other", label: "Other", color: "bg-gray-500" },
];

const statusColors = {
  lead: "bg-blue-500",
  prospect: "bg-orange-500",
  customer: "bg-green-500",
  inactive: "bg-gray-500",
};

const leadSourceColors = {
  website: "bg-blue-500",
  referral: "bg-green-500",
  social_media: "bg-purple-500",
  direct: "bg-red-500",
  trade_show: "bg-yellow-500",
  other: "bg-gray-500",
};

interface TagOption {
  value: string;
  label: string;
  color: string;
}

interface Column {
  key: string;
  title: string;
  width: number;
  sortable?: boolean;
  render?: (value: any, record: any) => React.ReactNode;
}

const ContactsTable = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedContact, setSelectedContact] = useState<ContactWithCompany | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterSource, setFilterSource] = useState<string>("all");
  const [filterInterests, setFilterInterests] = useState<string[]>([]);
  const [columnWidths, setColumnWidths] = useState<{[key: string]: number}>({});

  const resizeRef = useRef<{
    column: string | null;
    startX: number;
    startWidth: number;
  }>({ column: null, startX: 0, startWidth: 0 });

  const { data: contacts, isLoading, error } = useQuery<ContactWithCompany[]>({
    queryKey: ["/api/contacts"],
    queryFn: async () => {
      const response = await fetch("/api/contacts");
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      return response.json();
    },
  });
  
  // Filter and sort the contacts
  const filteredContacts = contacts
    ? contacts.filter((contact) => {
        const searchLower = searchText.toLowerCase();
        const matchesSearch =
          searchText === "" ||
          `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchLower) ||
          contact.email.toLowerCase().includes(searchLower) ||
          contact.phone?.toLowerCase().includes(searchLower);

        const matchesStatus =
          filterStatus === "all" || contact.status === filterStatus;
          
        const matchesSource =
          filterSource === "all" || contact.source === filterSource;
          
        const matchesInterests =
          filterInterests.length === 0 ||
          (contact.interestedInApplications && 
            filterInterests.some(interest => 
              contact.interestedInApplications?.includes(interest)));

        return matchesSearch && matchesStatus && matchesSource && matchesInterests;
      })
    : [];

  // Sort filtered contacts
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (!sortColumn) return 0;
    
    let valueA, valueB;
    
    // Handle nested properties
    if (sortColumn === "company") {
      valueA = a.company?.name || "";
      valueB = b.company?.name || "";
    } else if (sortColumn in a) {
      valueA = a[sortColumn as keyof Contact] || "";
      valueB = b[sortColumn as keyof Contact] || "";
    } else {
      return 0;
    }
    
    // For date sorting
    if (sortColumn === "createdAt" || sortColumn === "lastContactedDate") {
      valueA = valueA && typeof valueA === 'string' ? new Date(valueA).getTime() : 0;
      valueB = valueB && typeof valueB === 'string' ? new Date(valueB).getTime() : 0;
    }
    
    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const columns: Column[] = [
    {
      key: "name",
      title: "Name",
      width: 200,
      sortable: true,
      render: (_, record) => (
        <div className="flex items-center">
          <div className="relative w-10 h-10 flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-blue-700 opacity-50 blur-sm animate-glow-pulse"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-white font-semibold shadow-lg border border-cyan-400/30">
              {record.firstName[0]}{record.lastName[0]}
            </div>
          </div>
          <div className="ml-3">
            <div className="font-medium text-white">{`${record.firstName} ${record.lastName}`}</div>
            <div className="text-xs text-gray-400">{record.jobTitle || ""}</div>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      title: "Email",
      width: 200,
      sortable: true,
    },
    {
      key: "phone",
      title: "Phone",
      width: 150,
      sortable: true,
    },
    {
      key: "company",
      title: "Company",
      width: 180,
      sortable: true,
      render: (_, record) => {
        if (!record.company?.name) return <span className="text-gray-500">-</span>;
        
        return (
          <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-black/60 border border-gray-800 text-white shadow-inner">
            <div className="w-2 h-2 rounded-full bg-orange-500 mr-2 animate-pulse"></div>
            <span className="font-medium">{record.company.name}</span>
          </div>
        );
      },
    },
    {
      key: "status",
      title: "Status",
      width: 120,
      sortable: true,
      render: (value) => {
        const color = statusColors[value as keyof typeof statusColors] || "bg-gray-500";
        const glowClass = color === "bg-blue-500" ? "shadow-blue-500/30" : 
                         color === "bg-orange-500" ? "shadow-orange-500/30" : 
                         color === "bg-green-500" ? "shadow-green-500/30" : 
                         "shadow-gray-500/30";
                         
        return (
          <Badge className={`${color} text-white capitalize rounded-full px-3 py-0.5 shadow-sm ${glowClass} border border-white/10`}>
            {value?.replace("_", " ")}
          </Badge>
        );
      },
    },
    {
      key: "source",
      title: "Source",
      width: 140,
      sortable: true,
      render: (value) => {
        const color = leadSourceColors[value as keyof typeof leadSourceColors] || "bg-gray-500";
        const glowClass = color === "bg-blue-500" ? "shadow-blue-500/30" : 
                         color === "bg-green-500" ? "shadow-green-500/30" : 
                         color === "bg-purple-500" ? "shadow-purple-500/30" : 
                         color === "bg-red-500" ? "shadow-red-500/30" : 
                         color === "bg-yellow-500" ? "shadow-yellow-500/30" : 
                         "shadow-gray-500/30";
                         
        return (
          <Badge className={`${color} text-white capitalize rounded-full px-3 py-0.5 shadow-sm ${glowClass} border border-white/10`}>
            {value?.replace("_", " ")}
          </Badge>
        );
      },
    },
    {
      key: "interests",
      title: "Interests",
      width: 200,
      render: (_, record) => (
        <div className="flex flex-wrap gap-1.5">
          {record.interestedInApplications && Array.isArray(record.interestedInApplications) ? 
            record.interestedInApplications.map((app: string) => {
              const appType = applicationTypes.find(t => t.value === app);
              const color = appType?.color || "bg-gray-500";
              
              // Extract the color to determine the glow
              const colorMatch = color.match(/bg-([\w-]+)-\d+/);
              const colorBase = colorMatch ? colorMatch[1] : "gray";
              const glowClass = `shadow-${colorBase}-500/30`;
              
              return (
                <Badge 
                  key={app} 
                  className={`${color} text-white text-xs rounded-full px-2.5 py-0.5 shadow-sm ${glowClass} border border-white/10`}
                >
                  {appType?.label || app}
                </Badge>
              );
            }) : "-"}
        </div>
      ),
    },
    {
      key: "createdAt",
      title: "Created",
      width: 120,
      sortable: true,
      render: (value) => value ? new Date(value).toLocaleDateString() : "-",
    },
    {
      key: "actions",
      title: "Actions",
      width: 90,
      render: (_, record) => (
        <div className="flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleViewContact(record)}>
                View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleViewContact(record)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  // Initialize column widths
  useEffect(() => {
    const initialWidths: {[key: string]: number} = {};
    columns.forEach(col => {
      initialWidths[col.key] = col.width;
    });
    setColumnWidths(initialWidths);
  }, []);

  const handleStartResize = (e: React.MouseEvent, column: string) => {
    e.preventDefault();
    resizeRef.current = {
      column,
      startX: e.clientX,
      startWidth: columnWidths[column] || 100,
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleEndResize);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (resizeRef.current.column) {
      const diffX = e.clientX - resizeRef.current.startX;
      const newWidth = Math.max(80, resizeRef.current.startWidth + diffX);
      
      setColumnWidths(prev => ({
        ...prev,
        [resizeRef.current.column!]: newWidth
      }));
    }
  };
  
  const handleEndResize = () => {
    resizeRef.current = { column: null, startX: 0, startWidth: 0 };
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleEndResize);
  };

  const handleViewContact = (contact: ContactWithCompany) => {
    setSelectedContact(contact);
    setIsDrawerOpen(true);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  if (isLoading) {
    return (
      <div className="card-premium overflow-hidden animate-fadeIn">
        <div className="p-4 border-b border-gray-800 bg-black/60 backdrop-blur-sm shadow-lg">
          <div className="h-9 w-1/3 bg-gray-800/50 animate-pulse rounded"></div>
        </div>
        <div className="p-8 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="h-12 w-12 rounded-full bg-cyan-500/20 animate-pulse absolute"></div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center relative z-10">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              </div>
            </div>
            <p className="mt-4 text-gray-400 animate-pulse">Loading contacts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-premium overflow-hidden animate-fadeIn">
        <div className="p-4 border-b border-gray-800 bg-black/60 backdrop-blur-sm shadow-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            <h3 className="text-white font-medium">Error</h3>
          </div>
        </div>
        <div className="p-8 flex justify-center items-center">
          <div className="max-w-md text-center">
            <div className="inline-flex h-20 w-20 rounded-full bg-red-500/10 items-center justify-center mb-4">
              <AlertTriangle className="h-10 w-10 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Failed to load contacts</h3>
            <p className="text-gray-400 mb-4">{(error as Error).message}</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="bg-red-950/30 border-red-800/50 hover:bg-red-900/50 text-red-100"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-premium overflow-hidden animate-fadeIn">
      <div className="p-4 border-b border-gray-800 flex flex-col gap-5 md:flex-row md:items-center md:justify-between bg-gradient-to-b from-gray-900 via-black to-black backdrop-blur-sm shadow-lg">
        <div className="flex items-center w-full md:w-1/3">
          <div className="relative flex w-full group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-200" />
            </div>
            <Input
              placeholder="Search contacts..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 bg-gray-900/80 border-gray-800 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 placeholder-gray-500"
            />
            {searchText && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute inset-y-0 right-0 h-full px-2 text-gray-400 hover:text-white"
                onClick={() => setSearchText("")}
              >
                <div className="h-4 w-4 rounded-full border border-gray-400 hover:border-white flex items-center justify-center">
                  ×
                </div>
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-2/3 justify-end">
          <div className="rounded-md p-1 bg-gray-800/50 border border-gray-700 flex gap-0.5">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="min-w-[130px] bg-black/80 border-gray-700 focus:border-cyan-500 hover:bg-gray-800 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full mr-2 bg-cyan-500 animate-pulse"></div>
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                <SelectItem value="all">All Statuses</SelectItem>
                {Object.keys(contactStatusEnum.enumValues).map((status) => (
                  <SelectItem key={status} value={status}>{status.replace("_", " ")}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterSource} onValueChange={setFilterSource}>
              <SelectTrigger className="min-w-[130px] bg-black/80 border-gray-700 focus:border-orange-500 hover:bg-gray-800 focus:ring-1 focus:ring-orange-500/20 transition-all duration-300">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full mr-2 bg-orange-500 animate-pulse"></div>
                  <SelectValue placeholder="Source" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                <SelectItem value="all">All Sources</SelectItem>
                {Object.keys(leadSourceEnum.enumValues).map((source) => (
                  <SelectItem key={source} value={source}>{source.replace("_", " ")}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            variant="default" 
            size="icon" 
            className="bg-gradient-to-br from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 border-orange-500/10 shadow-md shadow-orange-500/20 hover:shadow-orange-500/30"
          >
            <div className="relative">
              <div className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-blue-400 border border-orange-400/40 shadow-sm shadow-orange-500/50 z-[100]"></div>
              <Filter className="h-4 w-4" />
            </div>
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gradient-to-b from-gray-900 to-black border-b border-gray-800">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="text-left px-3 py-4 font-semibold text-gray-200 text-sm relative first:rounded-tl-md"
                  style={{ width: `${columnWidths[column.key] || column.width}px`, minWidth: `${columnWidths[column.key] || column.width}px` }}
                >
                  <div className="flex items-center">
                    {column.sortable ? (
                      <button
                        className="flex items-center focus:outline-none hover:text-white transition-colors group"
                        onClick={() => handleSort(column.key)}
                      >
                        <span className={`${sortColumn === column.key ? 'text-cyan-400' : ''}`}>
                          {column.title}
                        </span>
                        <div className="ml-1.5 flex items-center">
                          {sortColumn === column.key ? (
                            sortDirection === "asc" ? 
                              <ChevronUp className="h-4 w-4 text-cyan-400 animate-fadeIn shadow-cyan-400/50" /> : 
                              <ChevronDown className="h-4 w-4 text-cyan-400 animate-fadeIn shadow-cyan-400/50" />
                          ) : (
                            <div className="opacity-0 group-hover:opacity-70 transition-opacity">
                              <ChevronUp className="h-3 w-3" />
                            </div>
                          )}
                        </div>
                      </button>
                    ) : (
                      <span className="text-gray-300">{column.title}</span>
                    )}
                  </div>
                  
                  {/* Resize handle */}
                  <div
                    className="absolute top-0 right-0 h-full w-1 cursor-col-resize hover:bg-cyan-600/50 hover:w-1.5 transition-all duration-150"
                    onMouseDown={(e) => handleStartResize(e, column.key)}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {sortedContacts.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center p-8 text-gray-400"
                >
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="relative w-24 h-24 mb-6">
                      <div className="absolute inset-0 rounded-full bg-orange-500/10 animate-glow-pulse"></div>
                      <div className="h-24 w-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center relative z-10 border border-orange-400/20 shadow-xl shadow-orange-500/10">
                        <UserX className="h-12 w-12 text-white/90" />
                      </div>
                    </div>
                    <p className="text-2xl font-medium text-white mb-2">No contacts found</p>
                    <p className="text-gray-400 mb-6 max-w-md text-center">Try adjusting your search or filter criteria to find what you're looking for.</p>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        className="border-gray-700 bg-gray-900/50 hover:bg-gray-800 text-gray-300 hover:border-cyan-500/40 hover:text-cyan-400 transition-all duration-300"
                        onClick={() => {
                          setSearchText("");
                          setFilterStatus("all");
                          setFilterSource("all");
                        }}
                      >
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        Reset filters
                      </Button>
                      <Button 
                        className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-lg shadow-orange-500/20 transition-all duration-300 hover:shadow-orange-500/30 border border-orange-500/20"
                      >
                        <div className="flex items-center">
                          Add Contact
                        </div>
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              sortedContacts.map((contact, idx) => (
                <tr
                  key={contact.id}
                  className={`group ${
                    idx % 2 === 0 ? "bg-gray-900/30" : "bg-black"
                  } hover:bg-gray-800/70 cursor-pointer transition-all duration-200 border-b border-gray-800 border-l-4 border-l-transparent hover:border-l-orange-500`}
                  onClick={() => handleViewContact(contact)}
                >
                  {columns.map((column) => (
                    <td
                      key={`${contact.id}-${column.key}`}
                      className="p-3 text-gray-300"
                      style={{ width: `${columnWidths[column.key] || column.width}px`, minWidth: `${columnWidths[column.key] || column.width}px` }}
                    >
                      <div className="transition-all duration-200 group-hover:translate-x-1">
                      {column.render
                        ? column.render(contact[column.key as keyof ContactWithCompany], contact)
                        : (column.key in contact 
                           ? String(contact[column.key as keyof ContactWithCompany] || "-")
                           : "-")}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedContact && (
        <ContactDrawer
          contact={selectedContact}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}
    </div>
  );
};

export default ContactsTable;