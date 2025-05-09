import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Contact, contactStatusEnum, leadSourceEnum } from "@shared/schema";
import { Loader2, Search, Filter, ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";
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
import ContactDrawer from "./ContactDrawer";

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
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterSource, setFilterSource] = useState<string>("");
  const [filterInterests, setFilterInterests] = useState<string[]>([]);
  const [columnWidths, setColumnWidths] = useState<{[key: string]: number}>({});

  const resizeRef = useRef<{
    column: string | null;
    startX: number;
    startWidth: number;
  }>({ column: null, startX: 0, startWidth: 0 });

  const { data: contacts, isLoading, error } = useQuery<Contact[]>({
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
          filterStatus === "" || contact.status === filterStatus;
          
        const matchesSource =
          filterSource === "" || contact.source === filterSource;
          
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
      valueA = valueA ? new Date(valueA).getTime() : 0;
      valueB = valueB ? new Date(valueB).getTime() : 0;
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
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold mr-3">
            {record.firstName[0]}{record.lastName[0]}
          </div>
          <div>
            <div className="font-medium">{`${record.firstName} ${record.lastName}`}</div>
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
      render: (_, record) => (
        <div>{record.company?.name || "-"}</div>
      ),
    },
    {
      key: "status",
      title: "Status",
      width: 120,
      sortable: true,
      render: (value) => (
        <Badge className={`${statusColors[value as keyof typeof statusColors] || "bg-gray-500"} text-white capitalize`}>
          {value?.replace("_", " ")}
        </Badge>
      ),
    },
    {
      key: "source",
      title: "Source",
      width: 140,
      sortable: true,
      render: (value) => (
        <Badge className={`${leadSourceColors[value as keyof typeof leadSourceColors] || "bg-gray-500"} text-white capitalize`}>
          {value?.replace("_", " ")}
        </Badge>
      ),
    },
    {
      key: "interests",
      title: "Interests",
      width: 200,
      render: (_, record) => (
        <div className="flex flex-wrap gap-1">
          {record.interestedInApplications && Array.isArray(record.interestedInApplications) ? 
            record.interestedInApplications.map((app: string) => {
              const appType = applicationTypes.find(t => t.value === app);
              return (
                <Badge key={app} className={`${appType?.color || "bg-gray-500"} text-white text-xs`}>
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

  const handleViewContact = (contact: Contact) => {
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
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error loading contacts: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="bg-background rounded-lg border shadow-sm overflow-hidden">
      <div className="p-4 border-b flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-muted/30">
        <div className="flex items-center w-full md:w-1/3">
          <Search className="w-4 h-4 mr-2 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-2/3 justify-end">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              {Object.keys(contactStatusEnum.enumValues).map((status) => (
                <SelectItem key={status} value={status}>{status.replace("_", " ")}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterSource} onValueChange={setFilterSource}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Sources</SelectItem>
              {Object.keys(leadSourceEnum.enumValues).map((source) => (
                <SelectItem key={source} value={source}>{source.replace("_", " ")}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 sticky top-0 z-10">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="text-left p-3 font-medium text-muted-foreground text-sm border-b relative"
                  style={{ width: `${columnWidths[column.key] || column.width}px`, minWidth: `${columnWidths[column.key] || column.width}px` }}
                >
                  <div className="flex items-center">
                    {column.sortable ? (
                      <button
                        className="flex items-center focus:outline-none"
                        onClick={() => handleSort(column.key)}
                      >
                        {column.title}
                        {sortColumn === column.key && (
                          sortDirection === "asc" ? 
                            <ChevronUp className="ml-1 h-4 w-4" /> : 
                            <ChevronDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    ) : (
                      column.title
                    )}
                  </div>
                  
                  {/* Resize handle */}
                  <div
                    className="absolute top-0 right-0 h-full w-1 cursor-col-resize group hover:bg-primary/30"
                    onMouseDown={(e) => handleStartResize(e, column.key)}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedContacts.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center p-4 text-muted-foreground"
                >
                  No contacts found.
                </td>
              </tr>
            ) : (
              sortedContacts.map((contact, idx) => (
                <tr
                  key={contact.id}
                  className={`${
                    idx % 2 === 0 ? "bg-background" : "bg-muted/10"
                  } hover:bg-muted/30 cursor-pointer transition-colors border-b`}
                  onClick={() => handleViewContact(contact)}
                >
                  {columns.map((column) => (
                    <td
                      key={`${contact.id}-${column.key}`}
                      className="p-3"
                      style={{ width: `${columnWidths[column.key] || column.width}px`, minWidth: `${columnWidths[column.key] || column.width}px` }}
                    >
                      {column.render
                        ? column.render(contact[column.key as keyof Contact], contact)
                        : contact[column.key as keyof Contact] || "-"}
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